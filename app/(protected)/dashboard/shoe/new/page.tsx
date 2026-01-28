import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import ShoeForm from '@/modules/shoes/components/ShoeForm';

export default async function NewShoePage() {
  await serverAuthGuard({ permission: ["product:create"] });

  return <ShoeForm />;
}
