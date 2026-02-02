import { Toaster } from "sonner";

import DashboardSidebar from "@/components/DashboardSidebar";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await serverAuthGuard([permissions.dashboard.access]);

  return (
    <>
      <DashboardSidebar />
      {children}
      <Toaster position="top-right" />
    </>
  );
}
