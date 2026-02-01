// Hook to check if the current user has the specified permission(s)

"use client";

import { useSession } from "next-auth/react";

import { hasPermission } from "@/modules/auth/permissions";
import { Permission, Role } from "@/modules/auth/types";

export default function useHasPermission(
  permission?: Permission[],
): boolean {
  const { data: session } = useSession();
  const role: Role | undefined = session?.user?.role;

  if (permission?.length) {
    const allowed = permission.every((permission) =>
      hasPermission(role, permission),
    );
    return allowed;
  }
  return false;
}
