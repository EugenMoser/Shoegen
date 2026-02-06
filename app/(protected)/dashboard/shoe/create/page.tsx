import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import ShoeForm from '@/modules/shoes/components/ShoeForm';

export default async function CreatehoePage() {
  await serverAuthGuard([permissions.product.create]);

  return <ShoeForm />;
}
