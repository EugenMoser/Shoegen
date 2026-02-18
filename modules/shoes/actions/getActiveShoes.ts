"use server";

import { prisma } from "@/lib/db/prisma";

import { Shoe, ShoeSize } from "../types";

export async function getActiveShoes(): Promise<Shoe[]> {
  try {
    const shoesRaw = await prisma.shoe.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        brand: true,
        currency: true,
        images: true,
        category: true,
        sizes: {
          select: {
            size: true,
          },
        },
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

    const shoes: Shoe[] = shoesRaw.map((shoeRaw) => {
      const shoe: Shoe = {
        id: shoeRaw.id,
        name: shoeRaw.name,
        description: shoeRaw.description,
        price: shoeRaw.price,
        brand: shoeRaw.brand,
        currency: shoeRaw.currency,
        images: shoeRaw.images,
        category: shoeRaw.category,
        sizes: Array.isArray(shoeRaw.sizes)
          ? shoeRaw.sizes.map((s) => ({
              size: String(s.size) as ShoeSize,
            }))
          : [],
        isActive: shoeRaw.isActive,
        usage: shoeRaw.usage,
        terrain: shoeRaw.terrain,
        season: shoeRaw.season,
        waterproof: shoeRaw.waterproof,
      };
      return shoe as Shoe;
    });

    return shoes as Shoe[];
  } catch (error) {
    console.error("Error fetching active shoes:", error);
    throw error;
  }
}
