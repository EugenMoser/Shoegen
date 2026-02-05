"use server";

import { prisma } from "@/lib/db/prisma";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { Result } from "@/types/result";

export async function deleteShoe(id: string): Promise<Result> {
  await serverAuthGuard([permissions.product.delete], true);

  try {
    await prisma.shoe.delete({
      where: { id },
    });

    return { success: true, message: "Schuh wurde gelöscht" };
  } catch (error) {
    console.error("Action Error:", error);
    return {
      success: false,
      error: `Shoe konnte nicht gelöscht werden: ${error instanceof Error ? error.message : "Ein unerwarteter Fehler ist aufgetreten."}`,
    };
  }
}
