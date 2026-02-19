"use server";

import { prisma } from "@/lib/db/prisma";
import { ActionResult, error, success } from "@/types/action";

import { Shoe, ShoeSize } from "../types";
import { getShoeSizes } from "./getShoeSize";

export async function getActiveShoes(): Promise<ActionResult<Shoe[]>> {
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

    const shoeSizeResult = await getShoeSizes();

    if (!shoeSizeResult.success) {
      throw new Error(
        `Fehler beim Abrufen der Schuhgrößen: ${shoeSizeResult.error}`,
      );
    }

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
        sizes: shoeSizeResult.data ?? [],
        isActive: shoeRaw.isActive,
        usage: shoeRaw.usage,
        terrain: shoeRaw.terrain,
        season: shoeRaw.season,
        waterproof: shoeRaw.waterproof,
      };
      return shoe as Shoe;
    });

    return success("Shoes fetched successfully", shoes as Shoe[]);
  } catch (err) {
    console.error("Error fetching active shoes:", err);
    if (err instanceof Error) {
      return error(
        `Aktive Schuhe konnten nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
