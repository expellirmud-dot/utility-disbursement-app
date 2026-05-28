import { AIVerifierOutput } from '../../types/aiVerifier';
import { runMockAiVerifier } from './mockAiVerifier';

// Simple in-memory cache to prevent redundant identical calls during a session
const cache = new Map<string, AIVerifierOutput>();

export async function runGeminiAiVerifier(rawText: string): Promise<AIVerifierOutput> {
  if (!rawText || rawText.trim() === '') {
    return runMockAiVerifier(rawText);
  }

  // Create a basic hash/key based on text length and content prefix/suffix
  const cacheKey = `${rawText.length}-${rawText.substring(0, 100)}-${rawText.substring(rawText.length - 100)}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const res = await fetch('/api/ai-verifier', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rawText }),
    });

    if (!res.ok) {
      // 501 means no API key or not configured, 500 means server/AI error
      console.warn(`AI Verifier API failed (status ${res.status}), falling back to mock.`);
      return runMockAiVerifier(rawText);
    }

    const data: AIVerifierOutput = await res.json();

    // Enforce domain rule: AI results are advisory and MUST require human review
    data.reviewRequired = true;
    
    // Safety check for critical schema structure
    if (data.overallConfidence === undefined || typeof data.overallConfidence !== 'number') {
      console.warn('AI Verifier returned malformed schema (missing overallConfidence). Falling back to mock.');
      return runMockAiVerifier(rawText);
    }

    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Failed to call AI verifier API, using mock:', error);
    return runMockAiVerifier(rawText);
  }
}
