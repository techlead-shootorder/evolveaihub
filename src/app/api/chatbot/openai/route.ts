import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[OpenAI API] Received request, method:', req.method);
  console.log('API Key:', process.env.OPENAI_API_KEY);
  if (req.method !== 'POST') {
    console.warn('[OpenAI API] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { messages } = req.body;
    console.log('[OpenAI API] Received messages array length:', messages?.length || 0);
   
    if (!messages || !Array.isArray(messages)) {
      console.error('[OpenAI API] Invalid request body:', req.body);
      return res.status(400).json({ error: 'Invalid request body. "messages" array is required.' });
    }
    
    // Replace with your actual OpenAI API key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('[OpenAI API] Missing API key in environment');
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    
    console.log('[OpenAI API] Preparing request to OpenAI service');
    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: messages,
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
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages || [],
      }),
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
      
      return res.status(response.status).json({
        error: 'Error from OpenAI API',
        status: response.status,
        statusText: response.statusText,
        details: errorData
      });
    }
    
    const data = await response.json();
    console.log('[OpenAI API] Successfully received and parsed response from OpenAI');
    
    // Log useful response info without logging the full message content
    console.log('[OpenAI API] Response metadata:', {
      id: data.id,
      model: data.model,
      choicesCount: data.choices?.length,
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
      totalTokens: data.usage?.total_tokens
    });
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('[OpenAI API] Unexpected error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}