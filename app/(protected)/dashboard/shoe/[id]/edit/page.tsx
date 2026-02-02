import { permissions } from "@/modules/auth/permissions";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";

export default async function UpdateShoePage() {
  await serverAuthGuard([permissions.product.update]);

  return <div>Update Shoe</div>;
}
