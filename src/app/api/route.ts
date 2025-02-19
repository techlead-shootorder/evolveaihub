import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.json(); // Parse JSON data from request body
    console.log('Received Data:', formData);

    return NextResponse.json({ message: 'Form data received', data: formData });
  } catch (error) {
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
