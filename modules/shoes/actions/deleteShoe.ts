"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { Result } from "@/types/result";

export async function deleteShoe(id: string): Promise<Result> {
  await serverAuthGuard([permissions.product.delete]);

  try {
    await prisma.shoe.delete({
      where: { id },
    });

    return { success: true, message: "Schuh wurde gelöscht" };
  } catch (error) {
    return {
      success: false,
      error: "Schuh konnte nicht gelöscht werden",
    };
  }
}
