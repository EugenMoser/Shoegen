import { permissions } from "@/modules/auth/permissions";
import requirePermission from "@/modules/auth/requirePermission";

type ShoePageProps = {
  params: {
    id: string;
  };
};

export default async function ShoePage({ params }: ShoePageProps) {
  await requirePermission([permissions.dashboard.access]);
  const { id } = params;

  return <div>Shoe Page ${id}</div>;
}
