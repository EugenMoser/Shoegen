"use client";

import { permissions } from "@/modules/auth/permissions";
import useHasPermission from "@/modules/auth/useHasPermissions";

export function UpdateProductButton() {
  const canUpdate = useHasPermission([permissions.product.update]);

  if (!canUpdate) return null;

  return <button className="btn-secondary">Update Product</button>;
}
