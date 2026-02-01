import { permissions } from "@/modules/auth/permissions";
import requirePermission from "@/modules/auth/requirePermission";

export default async function UpdateShoePage() {
  await requirePermission([permissions.product.update]);

  return <div>Update Shoe</div>;
}
