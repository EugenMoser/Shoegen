// permission gate only for ui permission checks in client components
"use client";

import { ReactNode } from "react";

import { Permission } from "@/modules/auth/types";

import useHasPermission from "./useHasPermissions";

type PermissionGateProps = {
  permission: Permission[];
  children: ReactNode;
};

export function PermissionGate({
  permission,
  children,
}: PermissionGateProps) {
  const allowed = useHasPermission(permission);

  if (!allowed) return null;

  return <>{children}</>;
}
