import { Toaster } from "sonner";

import DashboardSidebar from "@/components/DashboardSidebar";
import { permissions } from "@/modules/auth/permissions";
import requirePermission from "@/modules/auth/requirePermission";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requirePermission([permissions.dashboard.access]);

  return (
    <>
      <DashboardSidebar />
      {children}
      <Toaster position="top-right" />
    </>
  );
}
