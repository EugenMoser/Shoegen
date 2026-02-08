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
  prevState: ActionResult | null,
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

      category: formData.get("category"),
      usage: formData.getAll("usage"),
      season: formData.getAll("season"),
      terrain: formData.getAll("terrain"),

      waterproof: formData.get("waterproof") === "on",

      sizes:
        typeof rawSizes === "string"
          ? rawSizes
              .split(",")
              .map((s) => Number(s.trim()))
              .filter((n) => !Number.isNaN(n))
          : [],
    });

    if (!parsed.success) {
      return error("Ungültige Eingaben", 409);
    }

    await prisma.shoe.create({
      data: parsed.data,
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
