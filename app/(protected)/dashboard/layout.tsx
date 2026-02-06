import { headers } from 'next/headers';
import { Toaster } from 'sonner';

import { auth } from '@/auth';
import DashboardSidebar from '@/components/DashboardSidebar';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import { Breadcrumbs } from '@/modules/navigation/components/Breadcumbs';
import {
  filterNavigationByRole,
} from '@/modules/navigation/filterNavigationByRole';
import { getBreadcrumbs } from '@/modules/navigation/getBreadcrumbs';

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await serverAuthGuard([permissions.dashboard.access]);

  const session = await auth();
  const role = session?.user?.role;
  const navItems = filterNavigationByRole(role);

  return (
    <div className="flex flex-row gap-4">
      <Breadcrumbs role={role} />
      <DashboardSidebar items={navItems} />
      {children}
      <Toaster position="top-right" />
    </div>
  );
}
