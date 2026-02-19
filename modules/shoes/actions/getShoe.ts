import { prisma } from "@/lib/db/prisma";
import {
  Currency,
  Season,
  ShoeCategory,
  ShoeUsage,
  Terrain,
} from "@/modules/shoes/types";
import { ActionResult, error, success } from "@/types/action";

import { Shoe } from "../types";
import { getShoeSizes, getShoeSizesById } from "./getShoeSize";

interface ShoeRaw {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  currency: Currency;
  images: string[];
  isActive: boolean;
  category: ShoeCategory[];
  usage: ShoeUsage[];
  terrain: Terrain[];
  season: Season[];
  waterproof: boolean;
}

export async function getShoes(): Promise<ActionResult<Shoe[]>> {
  try {
    // Fetch all shoe details (table "shoe")
    const shoesRaw: ShoeRaw[] = await prisma.shoe.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        brand: true,
        currency: true,
        images: true,
        category: true,
        isActive: true,
        usage: true,
        terrain: true,
        season: true,
        waterproof: true,
      },
    });

    const shoeSizeResult = await getShoeSizes();

    if (!shoeSizeResult.success) {
      throw new Error(
        `Fehler beim Abrufen der Schuhgrößen: ${shoeSizeResult.error}`,
      );
    }
    const shoes: Shoe[] = shoesRaw.map((shoeRaw) => ({
      id: shoeRaw.id,
      name: shoeRaw.name,
      description: shoeRaw.description,
      price: shoeRaw.price,
      brand: shoeRaw.brand,
      currency: shoeRaw.currency,
      images: shoeRaw.images,
      category: shoeRaw.category,
      sizes: shoeSizeResult.data ?? [],
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
export async function getShoeById(
  id: string,
): Promise<ActionResult<Shoe>> {
  // Fetch shoe details (table "shoe")
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
      return error("Schuh nicht gefunden", 404);
    }

    // Fetch shoe sizes (table "shoeSize")
    const shoeSizeResult = await getShoeSizesById(shoeRaw.id);
    if (!shoeSizeResult.success) {
      throw new Error(
        `Fehler beim Abrufen der Schuhgrößen: ${shoeSizeResult.error}`,
      );
    }
    // Aggregate data into Shoe type
    const shoe: Shoe = {
      id: shoeRaw.id,
      name: shoeRaw.name,
      description: shoeRaw.description,
      price: shoeRaw.price,
      brand: shoeRaw.brand,
      currency: shoeRaw.currency,
      images: shoeRaw.images,
      category: shoeRaw.category,
      sizes: shoeSizeResult.data ?? [],
      isActive: shoeRaw.isActive,
      usage: shoeRaw.usage,
      terrain: shoeRaw.terrain,
      season: shoeRaw.season,
      waterproof: shoeRaw.waterproof,
    };

    return success("Shoe fetched successfully", shoe as Shoe);
  } catch (err) {
    console.error("Error fetching shoe by ID:", err);
    if (err instanceof Error) {
      return error(
        `Schuh konnte nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
