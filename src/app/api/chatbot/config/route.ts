import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET() {
  try {
    // First check if there's a default config in the database
    const config = await prisma.chatbot.findFirst({
      where: { isDefault: true }
    });
    
    // If found, return it
    if (config) {
      return NextResponse.json(config);
    }
    
    // Otherwise return default values
    return NextResponse.json({
      welcomeMessage: "Hello! I'm your AI assistant. How can I help you today?",
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      maxTokens: 800
    });
  } catch (error) {
    console.error("[API] Error fetching chatbot config:", error);
    return NextResponse.json(
      { error: "Failed to fetch chatbot config" },
      { status: 500 }
    );
  }
}