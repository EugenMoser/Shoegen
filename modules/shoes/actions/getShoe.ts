"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { ActionResult, error, success } from "@/types/action";

import { Shoe, ShoeSize } from "../types";

export async function getShoes(): Promise<ActionResult<Shoe[]>> {
  await serverAuthGuard([permissions.product.read], false);
  try {
    const shoesRaw = await prisma.shoe.findMany({
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
    });

    const shoes: Shoe[] = shoesRaw.map((shoeRaw) => ({
      id: shoeRaw.id,
      name: shoeRaw.name,
      description: shoeRaw.description,
      price: shoeRaw.price,
      brand: shoeRaw.brand,
      currency: shoeRaw.currency,
      images: shoeRaw.images,
      category: shoeRaw.category,
      sizes: Array.isArray(shoeRaw.sizes)
        ? shoeRaw.sizes.map((s) => ({ size: String(s.size) as ShoeSize }))
        : [],
      isActive: shoeRaw.isActive,
      usage: shoeRaw.usage,
      terrain: shoeRaw.terrain,
      season: shoeRaw.season,
      waterproof: shoeRaw.waterproof,
    }));

    return success("Shoes fetched successfully", shoes as Shoe[]);
  } catch (err) {
    console.error("Error fetching shoes:", err);
    if (err instanceof Error) {
      return error(
        `Schuh konnte nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}

// Get a single shoe by ID, with auth guard
export async function getShoeById(id: string): Promise<Shoe | null> {
  await serverAuthGuard([permissions.product.read], false);
  try {
    const shoeRaw = await prisma.shoe.findUnique({
      where: { id: id },
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
    });

    if (!shoeRaw) {
      throw new Error("Shoe not found");
    }

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
        ? shoeRaw.sizes.map((s) => ({ size: String(s.size) as ShoeSize }))
        : [],
      isActive: shoeRaw.isActive,
      usage: shoeRaw.usage,
      terrain: shoeRaw.terrain,
      season: shoeRaw.season,
      waterproof: shoeRaw.waterproof,
    };

    return shoe;
  } catch (error) {
    console.error("Error fetching shoe by ID:", error);
    throw error;
  }
}
