"use server";

import { prisma } from '@/lib/db/prisma';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import {
  ActionResult,
  error,
  success,
} from '@/types/action';

export async function deleteShoe(id: string): Promise<ActionResult> {
  try {
    await serverAuthGuard([permissions.product.delete], true);

    await prisma.shoe.delete({
      where: { id },
    });

    return success("Schuh wurde gelöscht");
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("authentifiziert")) {
        return error(err.message, 401);
      }
      if (err.message.includes("Berechtigung")) {
        return error(err.message, 403);
      }
      return error(
        `Schuh konnte nicht gelöscht werden: ${err.message}`,
        500,
      );
    }
    return error("Ein unerwarteter Fehler ist aufgetreten", 500);
  }
}
