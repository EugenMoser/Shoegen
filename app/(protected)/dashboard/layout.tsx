import { Toaster } from 'sonner';

import DashboardSidebar from '@/components/DashboardSidebar';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import { Role } from '@/modules/auth/types';
import { Breadcrumbs } from '@/modules/navigation/components/Breadcumbs';
import {
  filterNavigationByRole,
} from '@/modules/navigation/filterNavigationByRole';

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await serverAuthGuard([permissions.dashboard.access]);
  const role: Role = session?.user?.role;
  const navItems = filterNavigationByRole(role);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col w-full">
        <Breadcrumbs role={role} />
        <div className="flex flex-row gap-4">
          <DashboardSidebar items={navItems} />
          <div className="flex-1">{children}</div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
