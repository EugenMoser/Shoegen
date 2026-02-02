import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";
import ShoeForm from "@/modules/shoes/components/ShoeForm";

export default async function NewShoePage() {
  await serverAuthGuard([permissions.product.create]);

  return <ShoeForm />;
}
