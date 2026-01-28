"use server";

import { prisma } from '@/lib/db/prisma';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import { ShoeCategory } from '@/modules/products/types';

import { createShoeSchema } from '../schema';

export async function createShoe(formData: FormData) {
  await serverAuthGuard({
    permission: ["product:create"],
  });

  const parsed = createShoeSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    brand: formData.get("brand"),
    price: Number(formData.get("price")),

    category: formData.get("category"),
    usage: formData.getAll("usage"),
    season: formData.getAll("season"),
    terrain: formData.getAll("terrain"),

    waterproof: formData.get("waterproof") === "on",
    sizes: formData.getAll("sizes").map((s) => Number(s)),
  });

  if (!parsed.success) {
    throw new Error("INVALID_INPUT");
  }

  await prisma.shoe.create({
    data: parsed.data,
  });
}
