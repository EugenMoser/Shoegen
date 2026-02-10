"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { ActionResult, error, success } from "@/types/action";

import { editShoeSchema } from "../validationSchema";

export async function editShoe(
  shoeId: string,
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await serverAuthGuard([permissions.product.edit], true);

    const rawSizes = formData.get("sizes")?.toString();

    const parsed = editShoeSchema.safeParse({
      id: shoeId,
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      brand: formData.get("brand"),
      currency: formData.get("currency"),

      sizes:
        rawSizes && rawSizes.trim() !== ""
          ? rawSizes
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      isActive: formData.get("isActive") === "on",

      category: formData.get("category"),
      usage: formData.getAll("usage"),
      terrain: formData.getAll("terrain"),
      season: formData.getAll("season"),
      waterproof: formData.get("waterproof") === "on",
    });

    if (!parsed.success) {
      return error("Ungültige Eingaben", 409);
    }

    await prisma.shoe.update({
      where: { id: shoeId },
      data: parsed.data,
    });

    return success("Schuh aktualisiert");
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("authentifiziert")) {
        return error(err.message, 401);
      }
      if (err.message.includes("Berechtigung")) {
        return error(err.message, 403);
      }
      return error(
        `Schuh konnte nicht aktualisiert werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
