"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";

import { Shoe } from "../types";

export async function getShoes(): Promise<Shoe[]> {
  await serverAuthGuard([permissions.product.read], false);
  try {
    const shoes: Shoe[] | null = await prisma.shoe.findMany({
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
    });

    if (!shoes) {
      throw new Error("Shoe not found");
    }

    return shoes as Shoe[];
  } catch (error) {
    console.error("Error fetching shoes:", error);
    throw error;
  }
}

// Get a single shoe by ID, with auth guard
export async function getShoeById(id: string): Promise<Shoe | null> {
  await serverAuthGuard([permissions.product.read], false);
  try {
    const shoe: Shoe | null = await prisma.shoe.findUnique({
      where: { id: id },
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
    });

    if (!shoe) {
      throw new Error("Shoe not found");
    }

    return shoe;
  } catch (error) {
    console.error("Error fetching shoe by ID:", error);
    throw error;
  }
}
