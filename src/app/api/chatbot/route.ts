import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    // Basic validation
    if (!body.companyName || !body.botName) {
      return NextResponse.json(
        { error: "companyName and botName are required" },
        { status: 400 }
      );
    }

    const contactInfo = body.contactInfo || {};

    const chatbot = await prisma.chatbot.create({
      data: {
        companyName: body.companyName,
        companyDescription: body.companyDescription,
        industry: body.industry,
        location: body.location,
        operatingHours: body.operatingHours,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: contactInfo.address,
        services: body.services, // Now accepts array of objects as Json
        pricing: body.pricing,
        serviceAreas: body.serviceAreas,
        botName: body.botName,
        welcomeMessage: body.welcomeMessage,
        fallbackMessage: body.fallbackMessage,
        personality: body.personality,
        createdBy: body.createdBy || null, // Optional, from body
      },
    });

    return NextResponse.json(chatbot);
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