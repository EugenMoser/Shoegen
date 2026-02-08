import { get } from 'http';
import { notFound } from 'next/navigation';

import { prisma } from '@/lib/db/prisma';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import GetShoe from '@/modules/shoes/actions/getShoe';
import { EditShoeForm } from '@/modules/shoes/components/EditShoeForm';
import { Shoe } from '@/modules/shoes/types';

export default async function EditShoePage({
  params,
}: {
  params: { id: string };
}) {
  await serverAuthGuard([permissions.product.edit]);
  const shoe: Shoe | null = await GetShoe(params.id);
  if (!shoe) notFound();

  return (
    <>
      <EditShoeForm shoe={shoe} />
    </>
  );
}
