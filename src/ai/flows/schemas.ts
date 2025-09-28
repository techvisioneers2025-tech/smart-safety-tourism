
import { z } from 'genkit';

/**
 * @fileOverview Schemas for AI flows
 */

// Schema for calculate-safety-score.ts
export const SafetyScoreInputSchema = z.object({
  currentLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  plannedItinerary: z.array(z.object({
    location: z.string().describe("A planned location in the user's itinerary."),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
  })),
  locationHistory: z.array(z.object({
      latitude: z.number(),
      longitude: z.number(),
      timestamp: z.string().datetime(),
  })).describe("User's recent location history."),
});
export type SafetyScoreInput = z.infer<typeof SafetyScoreInputSchema>;

export const SafetyScoreOutputSchema = z.object({
  safetyScore: z.number().min(0).max(100).describe('The calculated safety score.'),
  reasons: z.array(z.string()).describe('The reasons for any score deductions.'),
});
export type SafetyScoreOutput = z.infer<typeof SafetyScoreOutputSchema>;


// Schema for chat.ts
export const ChatInputSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
      text: z.string(),
    })),
  })).optional(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


// Schema for smart-icon-suggestion.ts
export const SuggestIconInputSchema = z.object({
  label: z.string().describe('The label text for which an icon is needed.'),
});
export type SuggestIconInput = z.infer<typeof SuggestIconInputSchema>;

export const SuggestIconOutputSchema = z.object({
  iconName: z.string().describe('The suggested icon name.'),
  description: z.string().optional().describe('The description of the suggested icon, and why it is appropriate'),
});
export type SuggestIconOutput = z.infer<typeof SuggestIconOutputSchema>;
