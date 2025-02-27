import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    // Basic validation
    // if (!body.companyName || !body.botName) {
    //   return NextResponse.json(
    //     { error: "companyName and botName are required" },
    //     { status: 400 }
    //   );
    // }

    // const contactInfo = body.contactInfo || {};

    const integration = await prisma.integration.create({
      data: {
          logo: body.logo,
          primaryColor: body.primaryColor,
          secondaryColor: body.secondaryColor,
          chatbotId: body.chatbotId,
        //   chatbot: body.chatbot
          domain: body.domain,
          pills: body.pills,
          initialMessage: body.initialMessage,
          subText: body.subText,
          phone: body.phone,
       
      },
    });

    return NextResponse.json(integration);
  } catch (error) {
    console.error("Error creating chatbot:", error);
    return NextResponse.json(
      { error: "Failed to create chatbot", details: error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}