import { NextRequest, NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/apiConfig';

/**
 * POST /api/chat
 * Next.js Edge proxy for SSE chat stream from Go Backend
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const promptText = body.message || body.prompt || '';
    const url = new URL(API_ENDPOINTS.chatStream);
    if (promptText) {
      url.searchParams.set('message', promptText);
      url.searchParams.set('prompt', promptText);
    }

    const backendRes = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        message: promptText,
        prompt: promptText,
        history: body.history || [],
      }),
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: `Backend responded with HTTP ${backendRes.status}` },
        { status: backendRes.status }
      );
    }

    // Proxy the raw SSE stream through to client
    return new Response(backendRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
