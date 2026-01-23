// server guard to protect routes that require authentication and optional permission checks
import { hasPermission } from '@/modules/auth/permissions';
import type { Permission } from '@/modules/auth/types';

import { auth } from './auth';

type GuardOptions = {
  permission?: Permission;
};

export async function serverAuthGuard(options?: GuardOptions) {
  const session = await auth();

  // Check if user is authenticated
  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }

  if (options?.permission) {
    // Check if user has the required permission
    const allowed = hasPermission(session.user.role, options.permission);

    if (!allowed) {
      throw new Error("FORBIDDEN");
    }
  }

  return session;
}
