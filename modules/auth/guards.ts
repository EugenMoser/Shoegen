// Guard for requiring specific permissions, later we use middleware for this
import { redirect } from "next/navigation";

import { Role } from "@/modules/auth/types";

export function hasPermission(
  role: Role | undefined,
  permission: Permissions,
): boolean {
  if (!role) return false;

  return true;
}

export function requirePermission(
  role: Role | undefined,
  permission: Permissions,
) {
  if (!role) redirect("/login");

  if (!hasPermission(role, permission)) {
    throw new Error("Forbidden");
  }
}
