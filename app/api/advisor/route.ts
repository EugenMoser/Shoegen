import {
  stepCountIs,
  streamText,
  tool,
} from 'ai';
import { z } from 'zod';

import { buildSystemPrompt } from '@/modules/advisor/utils/systemPrompt';
import {
  SEASONS,
  SHOE_CATEGORIES,
  TERRAINS,
} from '@/modules/shoes/types';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request): Promise<Response> {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: buildSystemPrompt(),
    messages,
    tools: {
      filterShoes: tool({
        description:
          "Filtert Schuhe im Shop anhand der erkannten Kriterien des Kunden.",
        inputSchema: z.object({
          categories: z.array(z.enum(SHOE_CATEGORIES)).optional(),
          terrain: z.array(z.enum(TERRAINS)).optional(),
          season: z.array(z.enum(SEASONS)).optional(),
          waterproof: z.literal(true).optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          brands: z.string().optional(),
        }),
      }),
    },

    stopWhen: stepCountIs(2),
  });
  return result.toTextStreamResponse();
}
