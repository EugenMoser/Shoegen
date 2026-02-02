"use client";

import { PermissionGate } from "@/modules/auth/PermissionGate";
import { permissions } from "@/modules/auth/permissions";

export function UpdateProductButton() {
  return (
    <PermissionGate permission={[permissions.product.update]}>
      <button className="btn-secondary">Update Product</button>
    </PermissionGate>
  );
}
