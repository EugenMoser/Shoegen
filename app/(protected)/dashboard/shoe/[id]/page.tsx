import { ProtectedLayout } from "@/modules/auth/components/ProtectedLayout";
import { permissions } from "@/modules/auth/permissions";
import { getShoeById } from "@/modules/shoes/actions/getShoe";

import notFound from "../../not-found";

type ShoePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ShoePage({ params }: ShoePageProps) {
  const { id } = await params;

  const shoe = await getShoeById(id);

  if (!shoe) {
    notFound();
  }
  return (
    <ProtectedLayout permission={[permissions.product.read]}>
      <h2>Shoe Page ${id}</h2>
    </ProtectedLayout>
  );
}
