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

    let lead = leadId ? await prisma.lead.findUnique({ where: { id: leadId } }) : null;
    const latestMessage = messages[messages.length - 1]?.content || "";
    const newLeadInfo = extractLeadInfo(latestMessage);

    if (lead) {
      console.log("Updating existing lead:", lead);
      lead = await prisma.lead.update({
        where: { id: leadId },
        data: {
          name: newLeadInfo.name || lead.name,
          email: newLeadInfo.email || lead.email,
          phone: newLeadInfo.phone || lead.phone,
          messages: { push: messages[messages.length - 1] }, // Correct Prisma update format
          chatbotId: id,
        },
      });
    } else {
      console.log("Creating new lead");
      lead = await prisma.lead.create({
        data: {
          name: newLeadInfo.name || null,
          email: newLeadInfo.email || null,
          phone: newLeadInfo.phone || null,
          messages: [messages[messages.length - 1]],
          chatbotId: id,
        },
      });
    }

    const currentLeadInfo: LeadInfo = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
    };

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
    return NextResponse.json({ ...data, leadId: lead.id });

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