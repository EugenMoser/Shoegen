import { hasPermission } from "@/modules/auth/permissions";
import { Role } from "@/modules/auth/types";

import {
  dashboardNavigationConfig,
  DashboardNavItemProps,
} from "./dashboardNavigationConfig";

export function filterNavigationByRole(role: Role | undefined) {
  const items: readonly DashboardNavItemProps[] =
    dashboardNavigationConfig;

  const filteredItems = items.filter((item) => {
    if (!item.permission?.length) return true;

    return item.permission.every((permission) =>
      hasPermission(role, permission),
    );
  });

  return filteredItems;
}
