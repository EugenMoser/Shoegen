import { hasPermission } from '@/modules/auth/permissions';
import { Role } from '@/prisma/generated/enums';

import {
  dashboardNavigationConfig as breadcrumbMap,
  DashboardNavItemProps,
} from './dashboardNavigationConfig';

export function getBreadcrumbs(
  pathname: string,
  role: Role | undefined,
): Array<Pick<DashboardNavItemProps, "label" | "href" | "permission">> {
  const segments = pathname.split("/").filter(Boolean);
  const paths: string[] = [];

  for (let i = 0; i < segments.length; i++) {
    paths.push("/" + segments.slice(0, i + 1).join("/"));
  }

  // Flatten the breadcrumb config to include both top-level and child items
  const flatItems = breadcrumbMap.flatMap((item) => {
    const children = item.children ?? [];
    return [item, ...children];
  });

  // Helper function to match path with potential dynamic segments
  function matchPath(path: string, itemHref: string) {
    const itemParts = itemHref.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    if (itemParts.length !== pathParts.length) return false;
    return itemParts.every((part, idx) => {
      if (part.startsWith("[") && part.endsWith("]")) return true;
      return part === pathParts[idx];
    });
  }

  // Helper function to resolve breadcrumb label for dynamic routes
  function resolveBreadcrumb(
    path: string,
    item: DashboardNavItemProps,
  ): Pick<DashboardNavItemProps, "label" | "href" | "permission"> {
    if (!item.breadcrumb) {
      return {
        label: item.label,
        href: item.href,
        permission: item.permission,
      };
    }
    const itemParts = item.href.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);
    const idIndex = itemParts.findIndex(
      (part) => part.startsWith("[") && part.endsWith("]"),
    );
    const id = idIndex >= 0 ? pathParts[idIndex] : undefined;
    return item.breadcrumb({ id });
  }

  // Map paths to breadcrumb items, resolving dynamic segments and labels
  const mappedItems = paths.map((path) => {
    const item = flatItems.find((candidate) =>
      matchPath(path, candidate.href),
    );
    return item ? resolveBreadcrumb(path, item) : undefined;
  });

  // Remove any undefined values (paths without a matching breadcrumb config)
  const filteredItems = mappedItems.filter(Boolean) as Array<
    Pick<DashboardNavItemProps, "label" | "href" | "permission">
  >;

  const authorizedItems = filteredItems.filter((item) => {
    if (!item.permission) return true;
    return item.permission.every((permission) =>
      hasPermission(role, permission),
    );
  });

  // Return the final list of breadcrumbs
  return authorizedItems;
}
