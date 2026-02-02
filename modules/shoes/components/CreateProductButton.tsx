"use client";

import { PermissionGate } from "@/modules/auth/PermissionGate";
import { permissions } from "@/modules/auth/permissions";
import useHasPermission from "@/modules/auth/useHasPermissions";

export function CreateProductButton() {
  return (
    <PermissionGate permission={[permissions.product.create]}>
      <button className="btn-primary">Create Product</button>
    </PermissionGate>
  );
}
