import {
  Permission,
  Role,
} from '@/modules/auth/types';

export const permissions = {
  dashboard: {
    access: "dashboard:access",
  },
  product: {
    read: "product:read",
    create: "product:create",
    update: "product:update",
    delete: "product:delete",
  },
  order: {
    read: "order:read",
    update: "order:update",
  },
  user: {
    manage: "user:manage",
  },
} as const;

export const rolePermissions: Record<Role, readonly Permission[]> = {
  ADMIN: [
    permissions.dashboard.access,
    permissions.product.read,
    permissions.product.create,
    permissions.product.update,
    permissions.product.delete,
    permissions.order.read,
    permissions.order.update,
    permissions.user.manage,
  ],
  EDITOR: [
    permissions.dashboard.access,
    permissions.product.read,
    permissions.product.create,
    permissions.product.update,
  ],
  CUSTOMER: [permissions.product.read],
};

export function hasPermission(
  role: Role | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;
  if (!permission) return false;

  return rolePermissions[role].includes(permission);
}
