"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Role } from '@/prisma/generated/enums';

import { DashboardNavItemProps } from '../dashboardNavigationConfig';
import { getBreadcrumbs } from '../getBreadcrumbs';

export function Breadcrumbs({ role }: { role: Role | undefined }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname, role);

  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  // Filter out any undefined items
  const validBreadcrumbs = breadcrumbs.filter(Boolean) as Array<
    Pick<DashboardNavItemProps, "label" | "href">
  >;

  return (
    <nav className="mb-4 text-sm text-muted-foreground">
      <ol className="flex gap-2">
        {validBreadcrumbs.map((breadcrumb, index) => (
          <li
            key={`breadcrumb.href-${index}`}
            className="flex gap-2"
          >
            {index > 0 && <span>/</span>}
            <Link
              href={breadcrumb.href}
              className="hover:underline"
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
