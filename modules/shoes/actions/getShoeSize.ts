import { prisma } from "@/lib/db/prisma";
import { ActionResult, error, success } from "@/types/action";

import { ShoeSize } from "../types";
import { mapSizeRecord } from "../utils/mapShoeSize";

export async function getShoeSizesById(
  shoeId: string,
): Promise<ActionResult<{ size: ShoeSize; stock: number }[]>> {
  try {
    const sizes = await prisma.shoeSize.findMany({
      where: {
        shoeId: shoeId,
      },
      select: {
        size: true,
        stock: true,
      },
    });

    return success(
      "Shoe sizes fetched successfully",
      sizes.map(mapSizeRecord),
    );
  } catch (err) {
    console.error("Error fetching shoe sizes:", err);
    if (err instanceof Error) {
      return error(
        `Schuhgrößen konnten nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}

export async function getShoeSizes(): Promise<
  ActionResult<{ size: ShoeSize; stock: number }[]>
> {
  try {
    const sizes = await prisma.shoeSize.findMany({
      select: {
        size: true,
        stock: true,
      },
    });

    return success(
      "Shoe sizes fetched successfully",
      sizes.map(mapSizeRecord),
    );
  } catch (err) {
    console.error("Error fetching shoe sizes:", err);
    if (err instanceof Error) {
      return error(
        `Schuhgrößen konnten nicht abgerufen werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
