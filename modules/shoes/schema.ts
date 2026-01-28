// runtime schema validation for creating a shoe

import { z } from 'zod';

import {
  SEASONS,
  SHOE_CATEGORIES,
  SHOE_USAGES,
  TERRAINS,
} from './types';

export const createShoeSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  brand: z.string(),
  price: z.number().positive(),

  category: z.enum(SHOE_CATEGORIES),
  usage: z.array(z.enum(SHOE_USAGES)),
  season: z.array(z.enum(SEASONS)),
  terrain: z.array(z.enum(TERRAINS)),

  waterproof: z.boolean(),
  sizes: z.array(z.number().int()),
});
