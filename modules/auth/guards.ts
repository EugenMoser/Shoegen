// Guard for requiring specific permissions, later we use middleware for this
import { redirect } from 'next/navigation';

import { hasPermission } from '@/modules/auth/permissions';
import { Role } from '@/modules/auth/types';

export function requirePermission(
  role: Role | undefined,
  permission: Permissions,
) {
  if (!role) redirect("/login");

  if (!hasPermission(role, permission)) {
    throw new Error("Forbidden");
  }
}
