// server guard to protect routes that require authentication and optional authorization checks
//  serverAuthGuard(); // Login only
//  serverAuthGuard({ permission: "order:update" }); // Login + permission check

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { hasPermission } from '@/modules/auth/permissions';
import type { Permission } from '@/modules/auth/types';

type GuardOptions = {
  permission?: Permission;
};

export async function serverAuthGuard(options?: GuardOptions) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (options?.permission) {
    const allowed = hasPermission(session.user.role, options.permission);

    if (!allowed) {
      redirect("/unauthorized");
    }
  }

  return session;
}
