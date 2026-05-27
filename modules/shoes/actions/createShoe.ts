"use server";

import { prisma } from '@/lib/db/prisma';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import {
  ActionResult,
  error,
  success,
} from '@/types/action';

import { createShoeSchema } from '../validationSchema';

export async function createShoe(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await serverAuthGuard([permissions.product.create], true);

    const rawSizes = formData.get("sizes");

    const parsed = createShoeSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      brand: formData.get("brand"),
      price: Number(formData.get("price")),
      currency: formData.get("currency"), // Hinzugefügt
      isActive: formData.get("isActive") === "on", // Hinzugefügt
      category: formData.get("category"),
      usage: formData.getAll("usage"),
      season: formData.getAll("season"),
      terrain: formData.getAll("terrain"),

      waterproof: formData.get("waterproof") === "on",
      colors: formData.getAll("colors"),

      sizes:
        typeof rawSizes === "string" && rawSizes.trim() !== ""
          ? rawSizes
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "") // Entfernt leere Einträge
          : [],
    });

    if (!parsed.success) {
      return error("Ungültige Eingaben", 409);
    }

    await prisma.shoe.create({
      data: {
        ...parsed.data,
        sizes: {
          create: parsed.data.sizes.map((size) => ({
            size: Number(size),
            stock: 0,
          })),
        },
      },
    });

    return success("Schuh erfolgreich erstellt");
  } catch (err) {
    // Auth errors from serverAuthGuard
    if (err instanceof Error) {
      if (err.message.includes("authentifiziert")) {
        return error(err.message, 401);
      }
      if (err.message.includes("Berechtigung")) {
        return error(err.message, 403);
      }
      return error(
        `Schuh konnte nicht gespeichert werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
