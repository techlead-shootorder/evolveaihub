import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {fullName, email, company, phone, password } = await req.json();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    // console.log("existing user", existingUser)
    if (existingUser) {
       
      return NextResponse.json({ error: "User already registered" }, { status: 400 });
    }

 
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
 
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        company,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
