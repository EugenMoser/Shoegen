import { permissions } from "@/modules/auth/permissions";
import requirePermission from "@/modules/auth/requirePermission";
import ShoeForm from "@/modules/shoes/components/ShoeForm";

export default async function NewShoePage() {
  await requirePermission([permissions.product.create]);

  return <ShoeForm />;
}
