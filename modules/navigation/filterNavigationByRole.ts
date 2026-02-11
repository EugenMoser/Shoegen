import { hasPermission } from '@/modules/auth/permissions';
import { Role } from '@/modules/auth/types';

import {
  dashboardNavigationConfig,
  DashboardNavItemProps,
} from './dashboardNavigationConfig';

export function filterNavigationByRole(role: Role | undefined) {
  const items: readonly DashboardNavItemProps[] =
    dashboardNavigationConfig;
  return processItems(items, role);
}

function processItems(
  items: readonly DashboardNavItemProps[],
  role: Role | undefined,
): DashboardNavItemProps[] {
  // First filter items based on permission, then map to process children
  const filteredItems = items.filter((item) => {
    if (!item.permission?.length) return true;
    return item.permission.every((permission) =>
      hasPermission(role, permission),
    );
  });

  // Now process children of the filtered items
  const processedItems = filteredItems.map((item) => {
    if (item.children) {
      const children = processItems(item.children, role);
      return { ...item, children };
    }
    return item;
  });
  return processedItems;
}
