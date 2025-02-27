import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
    try {

        const body = await req.json();
        console.log("Request body:", body);


        const integration = await prisma.integration.update({
            where: { id: body?.id },
            data: {
                logo: body.logo,
                primaryColor: body.primaryColor,
                secondaryColor: body.secondaryColor,
                domain: body.domain,
                pills: body.pills,
                initialMessage: body.initialMessage,
                subText: body.subText,
                phone: body.phone,
            },
        });
        console.log("Integration", integration);
        return NextResponse.json(integration);
    } catch (error) {
        console.error("Error Updating integration:", error);
        return NextResponse.json(
            { error: "Failed to update integration", details: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}