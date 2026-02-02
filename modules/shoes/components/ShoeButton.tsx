import { PermissionGate } from "@/modules/auth/components/PermissionGate";
import { Permission } from "@/modules/auth/types";

type ShoeButtonProps = {
  title: string;
  permissions: Permission[];
  disabled?: boolean;
};

export function ShoeButton({
  title,
  permissions,
  disabled,
}: ShoeButtonProps) {
  return (
    <PermissionGate permission={permissions}>
      <button
        className="btn-primary"
        disabled={disabled}
      >
        {title}
      </button>
    </PermissionGate>
  );
}
