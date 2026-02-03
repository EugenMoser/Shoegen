import { Toaster } from "sonner";

import { auth } from "@/auth";
import DashboardSidebar from "@/components/DashboardSidebar";
import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import { filterNavigationByRole } from "@/modules/navigation/filterNavigationByRole";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await serverAuthGuard([permissions.dashboard.access]);

  const session = await auth();
  console.log("----->>>>> session", session);
  const role = session?.user?.role;
  console.log("----->>>>> role", role);
  const navItems = filterNavigationByRole(role);

  return (
    <>
      <DashboardSidebar items={navItems} />
      {children}
      <Toaster position="top-right" />
    </>
  );
}
