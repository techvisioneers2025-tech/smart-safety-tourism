
'use server';

/**
 * @fileOverview AI-powered safety score calculation flow.
 *
 * - calculateSafetyScore - A function that calculates a safety score based on user behavior.
 */

import { ai } from '@/ai/genkit';
import { SafetyScoreInputSchema, SafetyScoreOutputSchema, SafetyScoreInput, SafetyScoreOutput } from './schemas';


export async function calculateSafetyScore(input: SafetyScoreInput): Promise<SafetyScoreOutput> {
  return calculateSafetyScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'safetyScorePrompt',
  input: { schema: SafetyScoreInputSchema },
  output: { schema: SafetyScoreOutputSchema },
  prompt: `You are a security analyst for a travel safety app. Your task is to calculate a safety score for a tourist based on their real-time location and planned itinerary.

The score starts at 90 out of 100. Deduct points for the following risk factors:

1.  **Route Deviation:**
    -   -10 points if the user's current location is significantly different from their planned itinerary for the current time. A significant deviation means being in a completely different city, district, or area not mentioned in the itinerary.
2.  **Prolonged Inactivity:**
    -   -15 points if the user's location has not changed for more than 12 hours and this inactivity period does not correspond to a planned stay in their itinerary (e.g., a hotel stay overnight).

Analyze the provided data and return the final safety score and a list of reasons for any deductions. If there are no deductions, the score remains 90 and the reasons array should be empty.

**Current Time:** ${new Date().toISOString()}

**User Data:**
-   Current Location:
    -   Latitude: {{{currentLocation.latitude}}}
    -   Longitude: {{{currentLocation.longitude}}}
-   Planned Itinerary:
    {{#each plannedItinerary}}
    -   Location: {{{location}}}, Start: {{{startTime}}}, End: {{{endTime}}}
    {{/each}}
-   Location History:
    {{#each locationHistory}}
    -   Lat: {{{latitude}}}, Lon: {{{longitude}}}, Time: {{{timestamp}}}
    {{/each}}
`,
});

const calculateSafetyScoreFlow = ai.defineFlow(
  {
    name: 'calculateSafetyScoreFlow',
    inputSchema: SafetyScoreInputSchema,
    outputSchema: SafetyScoreOutputSchema,
  },
  async (input) => {
    // In a real application, you might fetch the itinerary and location history from a database here.
    const { output } = await prompt(input);
    return output!;
  }
);
