import { Role } from '@/modules/auth/types';

export const permissions = {
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

export const rolePermissions: Record<Role, readonly string[]> = {
  ADMIN: [
    permissions.product.read,
    permissions.product.create,
    permissions.product.update,
    permissions.product.delete,
    permissions.order.read,
    permissions.order.update,
    permissions.user.manage,
  ],
  EDITOR: [
    permissions.product.read,
    permissions.product.create,
    permissions.product.update,
  ],
  CUSTOMER: [permissions.product.read],
};

export function hasPermission(
  role: Role | undefined,
  permission: Permissions,
): boolean {
  if (!role) return false;
  if (!permission) return false;

  console.log(
    "----->>>>> permission",
    rolePermissions[role].includes(permission.toString()),
  );

  return rolePermissions[role].includes(permission.toString());
}
