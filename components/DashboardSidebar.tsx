"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DashboardNavItemProps } from "@/modules/navigation/dashboardNavigationConfig";

type DashboardSidebarProps = {
  items: DashboardNavItemProps[];
};

export default function DashboardSidebar({
  items,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col">
      <ul>
        {items.map((item) => {
          const isActive = pathname.endsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive ? "text-bold underline" : ""}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
