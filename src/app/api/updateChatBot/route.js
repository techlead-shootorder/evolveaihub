import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req) {
    try {
        const body = await req.json();
        console.log("Request body:", body);

        const chatbot = await prisma.chatbot.update({
            where: { id: body?.id },
            data: {
               ...body
            },
        });

        console.log("Integration", chatbot);
        return NextResponse.json(chatbot);
    } catch (error) {
        console.error("Error Updating chatbot:", error);
        return NextResponse.json(
            { error: "Failed to update chatbot", details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
