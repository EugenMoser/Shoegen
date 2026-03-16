import { prisma } from "@/lib/db/prisma";
import { ActionResult, error, success } from "@/types/action";

import { Shoe } from "../types";
import { mapSizeRecord } from "../utils/mapShoeSize";

interface GetShoeParams {
  isActive?: boolean;
}

// Get all shoes, with optional filter for active shoes
export async function getShoes({
  isActive = false,
}: GetShoeParams = {}): Promise<ActionResult<Shoe[]>> {
  try {
    // Fetch all shoe details (table "shoe")
    const shoesRaw = await prisma.shoe.findMany({
      where: isActive === false ? undefined : { isActive: isActive },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        brand: true,
        currency: true,
        sizes: {
          // Fetch sizes with stock information from shoeSize table
          select: {
            size: true,
            stock: true,
          },
        },
        images: true,
        category: true,
        isActive: true,
        usage: true,
        terrain: true,
        season: true,
        waterproof: true,
      },
    });

    const shoes: Shoe[] = shoesRaw.map((shoeRaw) => ({
      ...shoeRaw,
      sizes: shoeRaw.sizes.map(mapSizeRecord), // Change size type from number to ShoeSize
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
          // Fetch sizes with stock information from shoeSize table
          select: {
            size: true,
            stock: true,
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
      throw new Error(`Schuh mit ID ${id} nicht gefunden`);
    }
    // Aggregate data into Shoe type
    const shoe: Shoe = {
      ...shoeRaw,
      sizes: shoeRaw.sizes.map(mapSizeRecord), // Change size type from number to ShoeSize
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

export async function searchShoe(
  query: string,
): Promise<ActionResult<Shoe[]>> {
  try {
    const shoesRaw = await prisma.shoe.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } }, //insensitive = case-insensitive search
          { description: { contains: query, mode: "insensitive" } },
          { brand: { contains: query, mode: "insensitive" } },
        ],
      },
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
            stock: true,
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
      ...shoeRaw,
      sizes: shoeRaw.sizes.map(mapSizeRecord), // Change size type from number to ShoeSize
    }));
    return success("Shoes searched successfully", shoes as Shoe[]);
  } catch (err) {
    console.error("Error searching shoes:", err);
    if (err instanceof Error) {
      return error(
        `Schuhe konnten nicht durchsucht werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
