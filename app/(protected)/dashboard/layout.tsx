import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await serverAuthGuard();

  return <>{children}</>;
}
