import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
} from 'ai';
import { z } from 'zod';

import { buildSystemPrompt } from '@/modules/advisor/utils/systemPrompt';
import {
  SEASONS,
  SHOE_CATEGORIES,
  SHOE_COLORS,
  TERRAINS,
} from '@/modules/shoes/types';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request): Promise<Response> {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: {
      filterShoes: tool({
        description:
          "Filtert Schuhe im Shop anhand der erkannten Kriterien des Kunden.",
        inputSchema: z.object({
          categories: z.array(z.enum(SHOE_CATEGORIES)).optional(),
          terrains: z.array(z.enum(TERRAINS)).optional(),
          seasons: z.array(z.enum(SEASONS)).optional(),
          waterproof: z.literal(true).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          brands: z.string().optional(),
          colors: z.array(z.enum(SHOE_COLORS)).optional(),
        }),
        execute: async (args) => {
          return { applied: true };
        },
      }),
    },

    stopWhen: stepCountIs(10),
  });
  return result.toUIMessageStreamResponse();
}
