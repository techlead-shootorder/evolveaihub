import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LeadInfo {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

function createLeadCaptureSystemMessage(config: any, leadInfo: LeadInfo) {
  const missingInfo: string[] = [];
  if (!leadInfo.name) missingInfo.push("name");
  if (!leadInfo.email) missingInfo.push("email");
  if (!leadInfo.phone) missingInfo.push("phone");

  if (missingInfo.length === 0) {
    return `You are ${config.botName}, an AI sales agent for ${config.companyName}. 
      All info collected—focus on answering questions and suggesting next steps (e.g., "Would you like a demo?").`;
  }

  return `You are ${config.botName}, a helpful AI assistant for ${config.companyName}. 
    Your current priority is to collect customer information naturally in conversation.
    Missing info: ${missingInfo.join(", ")}
    Guidelines:
    1. Be conversational—don't demand info directly.
    2. Collect one piece at a time, starting with ${missingInfo[0]}.
    3. Answer questions while weaving in requests.
    4. Use personality: ${config.personality || "professional"}
    Current info:
    ${leadInfo.name ? `Name: ${leadInfo.name}` : ""}
    ${leadInfo.email ? `Email: ${leadInfo.email}` : ""}
    ${leadInfo.phone ? `Phone: ${leadInfo.phone}` : ""}
  `;
}

function extractLeadInfo(message: string): Partial<LeadInfo> {
  const info: Partial<LeadInfo> = {};

  console.log("User message:", message);
  
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}/;
  const nameRegex = /(?:(?:my|the) name(?:'s| is)|i(?:'m| am)(?: called)?) ([A-Za-z][A-Za-z\s'-]{0,30}[A-Za-z])/i;
  const altNameRegex = /(?:this is|hey,? it'?s|hello,? (?:i'?m|this is)) ([A-Za-z][A-Za-z\s'-]{0,30}[A-Za-z])/i;

  const emailMatch = message.match(emailRegex);
  const phoneMatch = message.match(phoneRegex);
  const nameMatch = message.match(nameRegex) || message.match(altNameRegex);

  if (emailMatch) info.email = emailMatch[0];
  if (phoneMatch) info.phone = phoneMatch[0];
  if (nameMatch && nameMatch[1]) {
    info.name = nameMatch[1].trim();
  } else {
    const words = message.trim().split(/\s+/);
    if (words.length <= 2 && /^[A-Za-z\s'-]+$/.test(message.trim())) {
      info.name = message.trim();
    }
  }

  if (info.name) {
    info.name = info.name.replace(/[.,;:!?]$/, '').trim();
    info.name = info.name.replace(/\b\w/g, c => c.toUpperCase()); // Capitalize each word
  }

  console.log("Extracted info:", info);
  return info;
}

// Function to get temp lead data for a chatbot
function getTempLeadData(chatbotId: string): LeadInfo {
  // Since localStorage is browser-only, we'll use a server-side equivalent
  // Node.js doesn't have localStorage, so we simulate it using global variables
  const globalAny = global as any;
  if (!globalAny.tempLeadStorage) {
    globalAny.tempLeadStorage = {};
  }
  
  if (!globalAny.tempLeadStorage[chatbotId]) {
    globalAny.tempLeadStorage[chatbotId] = {
      name: null,
      email: null,
      phone: null
    };
  }
  
  return globalAny.tempLeadStorage[chatbotId];
}

// Function to update temp lead data
function updateTempLeadData(chatbotId: string, data: Partial<LeadInfo>): LeadInfo {
  const globalAny = global as any;
  if (!globalAny.tempLeadStorage) {
    globalAny.tempLeadStorage = {};
  }
  
  if (!globalAny.tempLeadStorage[chatbotId]) {
    globalAny.tempLeadStorage[chatbotId] = {
      name: null,
      email: null,
      phone: null
    };
  }
  
  if (data.name) globalAny.tempLeadStorage[chatbotId].name = data.name;
  if (data.email) globalAny.tempLeadStorage[chatbotId].email = data.email;
  if (data.phone) globalAny.tempLeadStorage[chatbotId].phone = data.phone;
  
  return globalAny.tempLeadStorage[chatbotId];
}

// Function to clear temp lead data after successful lead creation
function clearTempLeadData(chatbotId: string): void {
  const globalAny = global as any;
  if (globalAny.tempLeadStorage && globalAny.tempLeadStorage[chatbotId]) {
    globalAny.tempLeadStorage[chatbotId] = {
      name: null,
      email: null,
      phone: null
    };
    console.log(`Cleared temporary lead data for chatbot ID: ${chatbotId}`);
  }
}

// Function to check if all required fields are present
function hasAllRequiredFields(data: LeadInfo): boolean {
  return !!data.name && !!data.email && !!data.phone;
}

export async function POST(req: Request) {
  try {
    console.log("[OpenAI API] Received request");

    const requestBody = await req.json();
    console.log("Request body:", requestBody);

    const { messages, leadId, id } = requestBody;

    if (!messages || !Array.isArray(messages) || !id) {
      console.error("Validation failed: messages or id missing");
      return NextResponse.json(
        { error: '"messages" array and "id" are required.' },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error("Missing OpenAI API Key");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const chatbotConfig = await prisma.chatbot.findUnique({ where: { id } });
    if (!chatbotConfig) {
      console.error("Chatbot not found for id:", id);
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    const latestMessage = messages[messages.length - 1]?.content || "";
    const newLeadInfo = extractLeadInfo(latestMessage);
    
    let lead = null;
    let currentLeadInfo: LeadInfo;
    
    // If we have a leadId, update the existing lead with any new information
    if (leadId) {
      lead = await prisma.lead.findUnique({ where: { id: leadId } });
      
      if (lead) {
        console.log("Updating existing lead:", lead);
        
        // Merge existing lead info with new info
        const updatedData: Partial<LeadInfo> = {};
        if (newLeadInfo.name && !lead.name) updatedData.name = newLeadInfo.name;
        if (newLeadInfo.email && !lead.email) updatedData.email = newLeadInfo.email;
        if (newLeadInfo.phone && !lead.phone) updatedData.phone = newLeadInfo.phone;
        
        // Only update message array
        lead = await prisma.lead.update({
          where: { id: leadId },
          data: {
            ...updatedData,
            messages: { push: messages[messages.length - 1] }
          },
        });
        
        // Use the updated lead info for the prompt
        currentLeadInfo = {
          name: lead.name,
          email: lead.email,
          phone: lead.phone
        };
      }
    } else {
      // If no leadId, get the temporary data from storage
      currentLeadInfo = getTempLeadData(id);
      
      // Update with any new information extracted from this message
      if (newLeadInfo.name) currentLeadInfo.name = newLeadInfo.name;
      if (newLeadInfo.email) currentLeadInfo.email = newLeadInfo.email;
      if (newLeadInfo.phone) currentLeadInfo.phone = newLeadInfo.phone;
      
      // Store updated info back to storage
      updateTempLeadData(id, currentLeadInfo);
      
      // Check if we now have all required fields
      if (hasAllRequiredFields(currentLeadInfo)) {
        console.log("All required fields present, creating new lead");
        
        // Create a new lead only when all information is available
        lead = await prisma.lead.create({
          data: {
            name: currentLeadInfo.name,
            email: currentLeadInfo.email,
            phone: currentLeadInfo.phone,
            messages: messages, // Store all messages
            chatbotId: id,
          },
        });
        
        // Clear the temporary lead data after successful lead creation
        clearTempLeadData(id);
        console.log("Lead created and temporary data cleared");
      } else {
        console.log("Missing required fields, not creating lead yet");
        console.log("Current temp data:", currentLeadInfo);
      }
    }

    const systemMessage = createLeadCaptureSystemMessage(chatbotConfig, currentLeadInfo);

    const openAiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: systemMessage }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    };

    console.log("[OpenAI API] Sending request to OpenAI", openAiRequestBody);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(openAiRequestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[OpenAI API] Error response:", errorText);
      return NextResponse.json({ error: "OpenAI API error", details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ ...data, leadId: lead?.id });

  } catch (error) {
    console.error("[OpenAI API] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}