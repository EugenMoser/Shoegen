"use client";

import { permissions } from "@/modules/auth/permissions";
import useHasPermission from "@/modules/auth/useHasPermissions";

export function CreateProductButton() {
  const canCreate = useHasPermission([permissions.product.create]);

  if (!canCreate) return null; // oder <Button disabled />

  return <button className="btn-primary">Create Product</button>;
}
