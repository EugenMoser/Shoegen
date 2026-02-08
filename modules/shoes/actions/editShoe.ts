"use server";

import { prisma } from '@/lib/db/prisma';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import { Result } from '@/types/result';

import { editShoeSchema } from '../validationSchema';

export async function editShoe(
  shoeId: string,
  prevState: Result | null,
  formData: FormData,
): Promise<Result> {
  await serverAuthGuard([permissions.product.edit], true);

  const parsed = editShoeSchema.safeParse({
    id: shoeId,
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    brand: formData.get("brand"),
    currency: formData.get("currency"),

    sizes: formData
      .get("sizes")
      ?.toString()
      .split(",")
      .map((s) => s.trim()),
    isActive: formData.get("isActive") === "on",

    category: formData.get("category"),
    usage: formData.getAll("usage"),
    terrain: formData.getAll("terrain"),
    season: formData.getAll("season"),
    waterproof: formData.get("waterproof") === "on",
  });

  if (!parsed.success) {
    return { success: false, error: "Ungültige Eingaben" };
  }

  try {
    await prisma.shoe.update({
      where: { id: shoeId },
      data: parsed.data,
    });

    return { success: true, message: "Shoe aktualisiert" };
  } catch (error) {
    console.error("Action Error:", error);
    return {
      success: false,
      error: `Shoe konnte nicht aktualisiert werden: ${error instanceof Error ? error.message : "Ein unerwarteter Fehler ist aufgetreten."}`,
    };
  }
}
