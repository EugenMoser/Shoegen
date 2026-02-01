import { permissions } from "@/modules/auth/permissions";
import { Permission } from "@/modules/auth/types";

export type DashboardNavItemProps = {
  label: string;
  href: string;
  permission?: Permission[];
};

export const dashboardNavigation: DashboardNavItemProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    permission: [permissions.dashboard.access],
  },
  {
    label: "Shoes",
    href: "/dashboard/shoe",
    permission: [permissions.product.read],
  },
  {
    label: "Create Shoe",
    href: "/dashboard/shoe/new",
    permission: [permissions.product.create],
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    permission: [permissions.order.read],
  },
  {
    label: "Users",
    href: "/dashboard/users",
    permission: [permissions.user.manage],
  },
];
