import { prisma } from "@/lib/db/prisma";

import { verifyPassword } from "./password";

export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<{ id: string; email: string } | false> {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return false;

  const isPasswordValid: boolean = await verifyPassword(
    password,
    admin.password,
  );

  if (!isPasswordValid) return false;

  return { id: admin.id, email: admin.email };
}
