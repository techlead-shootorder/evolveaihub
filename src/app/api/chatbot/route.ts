import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const chatbot = await prisma.chatbot.create({
      data: {
        companyName: body.companyName,
        companyDescription: body.companyDescription,
        industry: body.industry,
        location: body.location,
        operatingHours: body.operatingHours,
        email: body.contactInfo.email,
        phone: body.contactInfo.phone,
        address: body.contactInfo.address,
        services: body.services,
        pricing: body.pricing,
        serviceAreas: body.serviceAreas,
        botName: body.botName,
        welcomeMessage: body.welcomeMessage,
        fallbackMessage: body.fallbackMessage,
        personality: body.personality,
        faqs: body.faqs,
        policies: body.policies
      },
    });

    return NextResponse.json(chatbot);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chatbot", details: error }, { status: 500 });
  }
}
