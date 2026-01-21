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
