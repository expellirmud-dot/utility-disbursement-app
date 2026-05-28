import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_VERIFIER_PROMPT } from '../../../lib/extraction/aiVerifierPrompt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rawText } = body;

    if (!rawText) {
      return NextResponse.json({ error: 'Missing rawText' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return 501 Not Implemented so the client knows to fallback gracefully
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 501 });
    }

    const modelName = process.env.GEMINI_VERIFIER_MODEL || 'gemini-3.1-flash-lite';
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const fullPrompt = `${AI_VERIFIER_PROMPT}\n\nRAW TEXT TO EXTRACT:\n${rawText}`;
    
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    // Parse strictly
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError, '\nResponse was:', responseText);
      return NextResponse.json({ error: 'Invalid JSON returned from AI' }, { status: 500 });
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error('AI Verifier API Error:', error);
    let errorMessage = 'AI processing failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
