"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import requirePermission from "@/modules/auth/requirePermission";
import { Result } from "@/types/result";

import { createShoeSchema } from "../schema";

export async function createShoe(
  prevState: Result | null,
  formData: FormData,
): Promise<Result> {
  await requirePermission([permissions.product.create]);

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
    return {
      success: false,
      error: "Ungültige Eingaben",
    };
  }
  try {
    await prisma.shoe.create({
      data: parsed.data,
    });
    return {
      success: true,
      message: "Shoe erfolgreich erstellt",
    };
  } catch (error) {
    return {
      success: false,
      error: `Shoe konnte nicht gespeichert werden: ${(error as Error).message}`,
    };
  }
}
