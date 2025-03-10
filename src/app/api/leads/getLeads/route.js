import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
        include: {
            chatbot: true, // Include chatbot data
        },
      }); // Fetch all leads

    console.log("Fetched leads: ", leads);

    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
