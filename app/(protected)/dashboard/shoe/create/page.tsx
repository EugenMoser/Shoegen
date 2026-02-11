import { ProtectedLayout } from '@/modules/auth/components/ProtectedLayout';
import { permissions } from '@/modules/auth/permissions';
import ShoeForm from '@/modules/shoes/components/ShoeForm';

export default async function CreateShoePage() {
  return (
    <ProtectedLayout permission={[permissions.product.create]}>
      <ShoeForm />
    </ProtectedLayout>
  );
}
