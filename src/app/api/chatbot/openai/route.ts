import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  console.log('[OpenAI API] Received request, method:', req.method);
  console.log('API Key:', process.env.OPENAI_API_KEY);

  try {
    const { messages } = await req.json();
    console.log('[OpenAI API] Received messages array length:', messages?.length || 0);

    if (!messages || !Array.isArray(messages)) {
      console.error('[OpenAI API] Invalid request body:', messages);
      return NextResponse.json({ error: 'Invalid request body. "messages" array is required.' }, { status: 400 });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('[OpenAI API] Missing API key in environment');
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    // Fetch the system prompt from the database
    const systemPrompt = await prisma.systemPrompt.findFirst({ where: { isActive: true } });

    console.log('[OpenAI API] Preparing request to OpenAI service');
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt ? systemPrompt.prompt : "Default system prompt" },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 800
    };
    console.log('[OpenAI API] Request configuration:', {
      model: requestBody.model,
      messagesCount: requestBody.messages.length,
      temperature: requestBody.temperature,
      max_tokens: requestBody.max_tokens
    });

    console.log('[OpenAI API] Sending request to OpenAI');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(requestBody),
    });

    console.log('[OpenAI API] Received response from OpenAI, status:', response.status);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('[OpenAI API] Error response from OpenAI:', errorData);
      } catch (e) {
        console.error('[OpenAI API] Failed to parse error response as JSON');
        errorData = { message: 'Could not parse error response' };
      }

      console.error(
        '[OpenAI API] OpenAI API error:',
        response.status,
        response.statusText,
        errorData
      );

      return NextResponse.json({
        error: 'Error from OpenAI API',
        status: response.status,
        statusText: response.statusText,
        details: errorData
      }, { status: response.status });
    }

    const data = await response.json();
    console.log('[OpenAI API] Successfully received and parsed response from OpenAI');

    console.log('[OpenAI API] Response metadata:', {
      id: data.id,
      model: data.model,
      choicesCount: data.choices?.length,
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
      totalTokens: data.usage?.total_tokens
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('[OpenAI API] Unexpected error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}