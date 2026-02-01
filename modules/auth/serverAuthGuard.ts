// server guard to protect routes that require authentication and optional authorization checks
//  serverAuthGuard(); // Login only
//  serverAuthGuard({ permission: ["order:update"] }); // Login + permission check

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { hasPermission } from "@/modules/auth/permissions";

import { Permission } from "./types";

// Permissions only in array for easier checks, single permission can be passed as single element array
type GuardOptions = {
  permission?: Permission[];
};

export async function serverAuthGuard(options?: GuardOptions) {
  const session = await auth();

  // Authentication check
  if (!session?.user) {
    redirect("/login");
  }

  // Authorization check
  if (options?.permission?.length) {
    const allowed = options.permission.every((permission) =>
      hasPermission(session.user.role, permission),
    );

    if (!allowed) {
      redirect("/unauthorized");
    }
  }

  return session;
}
