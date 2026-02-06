import { auth } from '@/auth';
import { hasPermission } from '@/modules/auth/permissions';
import { Role } from '@/prisma/generated/enums';

import {
  dashboardNavigationConfig as breadcrumbMap,
  DashboardNavItemProps,
} from './dashboardNavigationConfig';

export function getBreadcrumbs(
  pathname: string,
  role: Role | undefined,
): DashboardNavItemProps[] {
  const segments = pathname.split("/").filter(Boolean);
  const paths: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    paths.push("/" + segments.slice(0, i + 1).join("/"));
  }

  // Map each path segment to its corresponding breadcrumb config item
  const mappedItems = paths.map((path) =>
    breadcrumbMap.find((item) => item.href === path),
  );

  // Remove any undefined values (paths without a matching breadcrumb config)
  const filteredItems = mappedItems.filter(
    Boolean,
  ) as DashboardNavItemProps[];

  // Filter out items the user does not have permission to see
  const authorizedItems = filteredItems.filter((item) => {
    // If no permission is required, show the item
    if (item && !item.permission) return true;
    // Otherwise, check if the user has all required permissions
    return (
      item &&
      item.permission &&
      item.permission.every((permission) =>
        hasPermission(role, permission),
      )
    );
  });

  // Return the final list of breadcrumbs
  return authorizedItems;
}
