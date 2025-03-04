import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const botData = searchParams.get("botData");

    let chatbots;
    if (botData) {
      chatbots = await prisma.chatbot.update({
        where: { id: botData.id },
        data: {
            companyName: botData.companyName,
            companyDescription: botData.companyDescription,
            industry: botData.industry,
            location: botData.location,
            operatingHours: botData.operatingHours,
            email: botData.email,
            phone: botData.phone,
            address: botData.address,
            pricing: botData.pricing,
            serviceAreas: botData.serviceAreas,
            botName: botData.botName,
            welcomeMessage: botData.welcomeMessage,
            fallbackMessage: botData.fallbackMessage,
            personality: botData.personality,
            isDefault: botData.isDefault,
            createdBy: botData.createdBy,
            services: botData.services,
          
            
        }
      });
    } 

    return NextResponse.json(chatbots, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}