// server guard to protect routes that require authentication and optional authorization checks
//  serverAuthGuard(); // Login only
//  serverAuthGuard({ permission: ["order:update"] }); // Login + permission check

import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { hasPermission } from '@/modules/auth/permissions';

import { Permission } from './types';

// Permissions only in array for easier checks, single permission can be passed as single element array

export async function serverAuthGuard(
  permission?: Permission[],
  isAction?: boolean,
) {
  const session = await auth();
  isAction = isAction ?? false;

  // Authentication check
  if (!session?.user) {
    console.log("No session, redirecting to login");
    if (isAction) {
      // Throwing an error in server actions
      throw new Error("Nicht authentifiziert. Bitte melden Sie sich an.");
    }
    // Redirect to login page if not authenticated (only on page routes, not in actions)
    redirect("/login");
  }

  // Authorization check
  if (permission?.length) {
    const allowed = permission.every((permission) =>
      hasPermission(session.user.role, permission),
    );

    if (!allowed) {
      if (isAction) {
        // Throwing an error in server actions
        throw new Error("Zugriff verweigert. Fehlende Berechtigungen.");
      }
      // Redirect to unauthorized page if permission check fails (only on page routes, not in actions)
      redirect("/unauthorized");
    }
  }

  return session;
}
