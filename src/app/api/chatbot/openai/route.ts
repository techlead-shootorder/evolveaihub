import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface LeadInfo {
  name?: string;
  email?: string;
  phone?: string;
}

function createLeadCaptureSystemMessage(config: any, leadInfo: LeadInfo) {
  const missingInfo = [];
  if (!leadInfo.name) missingInfo.push("name");
  if (!leadInfo.email) missingInfo.push("email");
  if (!leadInfo.phone) missingInfo.push(  "phone");

  if (missingInfo.length === 0) {
    return `You are ${config.botName}, an AI sales agent for ${config.companyName}. 
      All info collected—focus on answering questions and suggesting next steps (e.g., "Would you like a demo?").`;
  }

  return `You are ${config.botName}, a helpful AI assistant for ${config.companyName}. 
    Your current priority is to collect customer information naturally in conversation.
    Missing info: ${missingInfo.join(", ")}
    Guidelines:
    1. Be conversational—don’t demand info directly.
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
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const phoneRegex = /(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}/;
  const nameRegex = /(?:my name is|i am|i'm) ([A-Za-z\s]+)/i;

  if (emailRegex.test(message)) info.email = message.match(emailRegex)![0];
  if (phoneRegex.test(message)) info.phone = message.match(phoneRegex)![0];
  if (nameRegex.test(message)) info.name = message.match(nameRegex)![1].trim();

  return info;
}

export async function POST(req: Request) {
  try {
    console.log("[OpenAI API] Received request");

    const requestBody = await req.json();
    console.log("Request body:", requestBody); // Log incoming data

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

    const chatbotConfig = await prisma.chatbot.findUnique({ where: { id: id } });
    if (!chatbotConfig) {
      console.error("Chatbot not found for id:", id);
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    let lead = leadId ? await prisma.lead.findUnique({ where: { id: leadId } }) : null;
    const latestMessage = messages[messages.length - 1]?.content || "";
    const newLeadInfo = extractLeadInfo(latestMessage);

    if (lead) {
      const updatedLeadInfo = {
        name: newLeadInfo.name || lead.name,
        email: newLeadInfo.email || lead.email,
        phone: newLeadInfo.phone || lead.phone,
      };
      lead = await prisma.lead.update({
        where: { id: leadId },
        data: {
          name: updatedLeadInfo.name,
          email: updatedLeadInfo.email,
          phone: updatedLeadInfo.phone,
          messages: [...(lead.messages as any[]), messages[messages.length - 1]],
          chatbotId: id,
        },
      });
    } else {
      lead = await prisma.lead.create({
        data: {
          name: newLeadInfo.name,
          email: newLeadInfo.email,
          phone: newLeadInfo.phone,
          messages: [messages[messages.length - 1]],
          chatbotId: id,
        },
      });
    }

    const currentLeadInfo = {
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