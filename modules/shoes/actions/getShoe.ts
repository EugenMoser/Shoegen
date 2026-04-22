import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@/prisma/generated/client";
import { ActionResult, error, success } from "@/types/action";

import { Season, Shoe, ShoeCategory, Terrain } from "../types";
import { mapSizeRecord } from "../utils/mapShoeSize";

interface GetShoeParams {
  isActive?: boolean;
  searchQuery?: string;
  brands?: string[];
  categories?: ShoeCategory[];
  terrains?: Terrain[];
  seasons?: Season[];
  waterproof?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

// Get all shoes, with optional filter for active shoes or search query
export async function getShoes({
  isActive = false,
  searchQuery,
  brands,
  categories,
  terrains,
  seasons,
  waterproof,
  minPrice,
  maxPrice,
}: GetShoeParams = {}): Promise<ActionResult<Shoe[]>> {
  const conditions = [
    // Add search functionality if searchQuery is provided
    searchQuery && {
      OR: [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
    waterproof !== undefined && { waterproof },
    categories && { category: { hasSome: categories } },
    terrains && { terrain: { hasSome: terrains } },
    seasons && { season: { hasSome: seasons } },
    brands && { brand: { in: brands } },
    minPrice !== undefined &&
      maxPrice !== undefined && {
        price: { gte: minPrice, lte: maxPrice },
      },
  ].filter(Boolean) as Prisma.ShoeWhereInput[]; // Filter out undefined conditions
  const whereClause: Prisma.ShoeWhereInput = {
    ...(isActive && { isActive: true }), // Filter for active shoes if isActive is true
    ...(conditions.length > 0 && { AND: conditions }), // Add dynamic conditions if any exist
  };

  try {
    // Fetch all shoe details (table "shoe")
    const shoesRaw = await prisma.shoe.findMany({
      where: whereClause,
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
export async function getShoePrices(): Promise<ActionResult<number[]>> {
  try {
    const prices = await prisma.shoe.aggregate({
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });
    const priceValues = [prices._min.price, prices._max.price];
    const validPrices = priceValues.every(
      (price) => typeof price === "number",
    );
    if (!validPrices) {
      throw new Error("Ungültige Preisdaten erhalten");
    }
    return success("Shoe prices fetched successfully", priceValues);
  } catch (err) {
    console.error("Error fetching shoe prices:", err);
    if (err instanceof Error) {
      return error(
        `Schuhpreise konnten nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
export async function getShoeBrands(): Promise<ActionResult<string[]>> {
  try {
    const brandsRaw = await prisma.shoe.findMany({
      where: { isActive: true },
      distinct: ["brand"],
      select: {
        brand: true,
      },
    });
    // Extract brand names and filter out any null or undefined values
    const brands = brandsRaw
      .map((record) => record.brand) // Extract the brand field from each record
      .filter((brand): brand is string => typeof brand === "string"); // Type guard to ensure we only return strings

    return success("Shoe brands fetched successfully", brands);
  } catch (err) {
    console.error("Error fetching shoe brands:", err);
    if (err instanceof Error) {
      return error(
        `Schuhmarken konnten nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
