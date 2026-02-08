import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import { GetShoeById } from '@/modules/shoes/actions/getShoe';

import notFound from '../../not-found';

type ShoePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ShoePage({ params }: ShoePageProps) {
  await serverAuthGuard([permissions.dashboard.access]);
  // 2. Id from the url
  const { id } = await params;

  const shoe = await GetShoeById(id);

  if (!shoe) {
    notFound();
  }
  return (
    <>
      <h2>Shoe Page ${id}</h2>
    </>
  );
}
