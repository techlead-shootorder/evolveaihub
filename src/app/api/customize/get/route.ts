import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const chatbotId = searchParams.get("chatbotId");
    let integration;
    if (chatbotId) {
        integration = await prisma.integration.findFirst({
        where: { chatbotId: chatbotId },
      });
    } 

    console.log("In bacckend ", integration);

    return NextResponse.json(integration, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}