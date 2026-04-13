// runtime schema validation for creating a shoe

import { z } from 'zod';

import {
  CURRENCIES,
  SEASONS,
  SHOE_CATEGORIES,
  SHOE_SIZES,
  SHOE_USAGES,
  TERRAINS,
} from './types';

export const createShoeSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  brand: z.string(),
  currency: z.enum(CURRENCIES),

  sizes: z.array(z.enum(SHOE_SIZES)),
  isActive: z.boolean(),

  category: z.array(z.enum(SHOE_CATEGORIES)),
  usage: z.array(z.enum(SHOE_USAGES)),
  terrain: z.array(z.enum(TERRAINS)),
  season: z.array(z.enum(SEASONS)),
  waterproof: z.literal(true).optional(),
});

export const editShoeSchema = createShoeSchema.extend({
  id: z.string(),
});
