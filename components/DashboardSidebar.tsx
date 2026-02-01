"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import { dashboardNavigation } from "@/modules/navigation/dashboardNavigation";
import { filterNavigationByRole } from "@/modules/navigation/filterNavigationByRole";

export default function DashboardSidebar() {
  const { data } = useSession();
  const role = data?.user?.role;

  const navItems = filterNavigationByRole(role, dashboardNavigation);

  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
