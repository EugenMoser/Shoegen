import { ReactNode } from "react";

import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { Permission } from "@/modules/auth/types";

interface ProtectedLayoutProps {
  permission?: Permission[];
  children: ReactNode;
  fallback?: ReactNode; // Optional: Custom 403 UI
}

export async function ProtectedLayout({
  permission,
  children,
  fallback,
}: ProtectedLayoutProps) {
  await serverAuthGuard(permission);
  return <>{children}</>;
}
