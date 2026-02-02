"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { Result } from "@/types/result";

import { updateShoeSchema } from "../schema";

export async function updateShoe(
  shoeId: string,
  prevState: Result | null,
  formData: FormData,
): Promise<Result> {
  await serverAuthGuard([permissions.product.update]);

  const parsed = updateShoeSchema.safeParse({
    id: shoeId,
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
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
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
