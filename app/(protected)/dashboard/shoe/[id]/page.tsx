import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';

type ShoePageProps = {
  params: {
    id: string;
  };
};

export default async function ShoePage({ params }: ShoePageProps) {
  await serverAuthGuard([permissions.dashboard.access]);
  const { id } = params;

  return <div>Shoe Page ${id}</div>;
}
