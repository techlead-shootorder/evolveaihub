import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const botId = searchParams.get("botId");

    let chatbots;
    if (botId) {
      chatbots = await prisma.chatbot.findUnique({
        where: { id: botId },
      });
    } 

    return NextResponse.json(chatbots, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}