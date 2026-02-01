import { hasPermission } from "@/modules/auth/permissions";
import { Permission, Role } from "@/modules/auth/types";

import { DashboardNavItemProps } from "./dashboardNavigation";

export function filterNavigationByRole(
  role: Role | undefined,
  items: DashboardNavItemProps[],
) {
  return items.filter((item) => {
    if (!item.permission?.length) return true;
    return item.permission.every((permission) =>
      hasPermission(role, permission),
    );
  });
}
