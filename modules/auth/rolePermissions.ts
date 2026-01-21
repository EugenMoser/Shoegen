import { Role } from "@/modules/auth/types";

import { permissions } from "./permissions";

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
