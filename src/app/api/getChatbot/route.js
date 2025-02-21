import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const chatbotId = searchParams.get("id");

    let chatbots;
    if (chatbotId) {
      chatbots = await prisma.chatbot.findMany({
        where: { createdBy: chatbotId },
      });
    } 

    return NextResponse.json(chatbots, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
