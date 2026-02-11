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
    // If no permissions are required, include the item
    if (!item.permission?.length) return true;

    // Check if user has all required permissions for the item
    return item.permission.every((permission) =>
      hasPermission(role, permission),
    );
  });
  console.log("----->>>>> filteredItems", filteredItems);
  // Now process children of the filtered items
  const processedItems = filteredItems.map((item) => {
    if (item.children) {
      const children = processItems(item.children, role);
      return { ...item, children };
    }
    console.log("----->>>>> item in process", item);

    return item;
  });
  console.log("----->>>>> processedItems", processedItems);

  return processedItems;
}
