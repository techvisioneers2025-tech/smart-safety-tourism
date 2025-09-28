
import {NextRequest, NextResponse} from 'next/server';
import { chatFlow } from '@/ai/flows/chat';

export async function POST(req: NextRequest) {
  try {
    const {message, history} = await req.json();

    const response = await chatFlow({ message, history });

    return new Response(response, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (e: any) {
    console.error("API Route Error:", e);
    return NextResponse.json(
      { error: "An error occurred while processing your request.", details: e.message },
      { status: 500 }
    );
  }
}
