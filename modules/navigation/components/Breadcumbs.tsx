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
  const validItems = breadcrumbs.filter(
    Boolean,
  ) as DashboardNavItemProps[];

  return (
    <nav className="mb-4 text-sm text-muted-foreground">
      <ol className="flex gap-2">
        {validItems.map((item, index) => (
          <li
            key={`item.href-${index}`}
            className="flex gap-2"
          >
            {index > 0 && <span>/</span>}
            <Link
              href={`item.href-${index}`}
              className="hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
