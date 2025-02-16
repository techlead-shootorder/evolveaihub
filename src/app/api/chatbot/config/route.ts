import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch the default chatbot configuration
    const config = await prisma.chatbot.findFirst({ where: { isDefault: true } });

    // Fetch the system prompt from the database
    const systemPrompt = await prisma.systemPrompt.findFirst({ where: { isActive: true } });

    if (config) {
      return NextResponse.json({
        ...config,
        systemPrompt: systemPrompt ? systemPrompt.prompt : "Default system prompt"
      });
    }

    return NextResponse.json({
      welcomeMessage: "Hello! I'm your AI assistant. How can I help you today?",
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      maxTokens: 800,
      systemPrompt: systemPrompt ? systemPrompt.prompt : "Default system prompt"
    });
  } catch (error) {
    console.error("[API] Error fetching chatbot config:", error);
    return NextResponse.json(
      { error: "Failed to fetch chatbot config" },
      { status: 500 }
    );
  }
}