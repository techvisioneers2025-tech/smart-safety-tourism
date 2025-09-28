
'use server';

/**
 * @fileOverview AI-powered icon suggestion flow.
 *
 * - suggestIcon - A function that suggests an icon based on the input text.
 */

import {ai} from '@/ai/genkit';
import { SuggestIconInputSchema, SuggestIconOutputSchema, SuggestIconInput, SuggestIconOutput } from './schemas';


export async function suggestIcon(input: SuggestIconInput): Promise<SuggestIconOutput> {
  return suggestIconFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestIconPrompt',
  input: {schema: SuggestIconInputSchema},
  output: {schema: SuggestIconOutputSchema},
  prompt: `You are an expert UI/UX designer. Your task is to suggest the most relevant icon name for a given label text.  The icon name should be a simple, recognizable icon from the Material Design Icons set (https://fonts.google.com/icons).  Output the iconName, and include a description of why the icon is appropriate for the label.

Label Text: {{{label}}}`,
});

const suggestIconFlow = ai.defineFlow(
  {
    name: 'suggestIconFlow',
    inputSchema: SuggestIconInputSchema,
    outputSchema: SuggestIconOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
