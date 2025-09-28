
'use server';
/**
 * @fileOverview A conversational chat flow that maintains context.
 *
 * - chatFlow - A function that handles the chat conversation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {MessageData} from 'genkit';
import { ChatInputSchema, ChatOutputSchema, ChatInput, ChatOutput } from './schemas';


export async function chatFlow(input: ChatInput): Promise<ChatOutput> {
  return chatFlowInternal(input);
}

const chatFlowInternal = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { message, history } = input;

    const llm = ai.model('googleai/gemini-2.5-flash');

    // Convert history to MessageData[] if it exists
    const genkitHistory: MessageData[] = history ? history.map(h => ({
      role: h.role,
      content: h.content,
    })) : [];

    const { output } = await ai.generate({
      model: llm,
      history: genkitHistory,
      prompt: message,
    });

    return output.text;
  }
);
