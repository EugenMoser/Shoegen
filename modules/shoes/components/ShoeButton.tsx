import { PermissionGate } from "@/modules/auth/components/PermissionGate";
import { Permission } from "@/modules/auth/types";

type ShoeButtonProps = {
  title: string;
  permissions: Permission[];
};

export function ShoeButton({ title, permissions }: ShoeButtonProps) {
  return (
    <PermissionGate permission={permissions}>
      <button className="btn-primary">{title}</button>
    </PermissionGate>
  );
}
