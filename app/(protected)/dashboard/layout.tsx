import { Toaster } from "sonner";

import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await serverAuthGuard({ permission: [permissions.dashboard.access] });

  return (
    <>
      {children}
      <Toaster position="top-right" />
    </>
  );
}
