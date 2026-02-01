import { Toaster } from "sonner";

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
      {children}
      <Toaster position="top-right" />
    </>
  );
}
