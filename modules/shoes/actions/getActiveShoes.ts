"use server";

import { prisma } from '@/lib/db/prisma';

import { Shoe } from '../types';

export async function getActiveShoes(): Promise<Shoe[]> {
  try {
    const shoes: Shoe[] | null = await prisma.shoe.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        brand: true,
        currency: true,
        category: true,
        sizes: true,
        isActive: true,
        usage: true,
        terrain: true,
        season: true,
        waterproof: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!shoes) {
      throw new Error("Active shoes not found");
    }

    return shoes as Shoe[];
  } catch (error) {
    console.error("Error fetching active shoes:", error);
    throw error;
  }
}
