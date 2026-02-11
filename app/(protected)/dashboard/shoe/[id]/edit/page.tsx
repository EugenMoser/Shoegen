import { JSX } from 'react';

import { notFound } from 'next/navigation';

import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';
import { permissions } from '@/modules/auth/permissions';
import { getShoeById } from '@/modules/shoes/actions/getShoe';
import ShoeForm from '@/modules/shoes/components/ShoeForm';
import { Shoe } from '@/modules/shoes/types';

type EditShoePageProps = {
  params: {
    id: string;
  };
};

export default async function EditShoePage({
  params,
}: EditShoePageProps): Promise<JSX.Element> {
  const shoe: Shoe | null = await getShoeById(params.id);
  if (!shoe) notFound();

  return (
    <ProtectedLayout permission={[permissions.product.edit]}>
      <ShoeForm shoe={shoe} />
    </ProtectedLayout>
  );
}
