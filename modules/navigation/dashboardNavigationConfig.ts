import { permissions } from '@/modules/auth/permissions';
import { Permission } from '@/modules/auth/types';

export type BreadcrumbResolver = (params: {
  id?: string;
  data?: {
    label: string;
  };
}) => {
  label: string;
  href: string;
  permission?: Permission[];
};

export type DashboardNavItemProps = {
  label: string;
  href: string;
  permission?: Permission[];
  children?: DashboardNavItemProps[];
  breadcrumb?: BreadcrumbResolver;
};

export type ClientNavItem = Pick<DashboardNavItemProps, "label" | "href">;

export const dashboardNavigationConfig: readonly DashboardNavItemProps[] =
  [
    {
      label: "Dashboard",
      href: "/dashboard",
      permission: [permissions.dashboard.access],
    },

    {
      label: "Shoes",
      href: "/dashboard/shoe",
      permission: [permissions.product.read],
      children: [
        {
          label: "Shoe Details",
          href: "/dashboard/shoe/[id]",
          permission: [permissions.product.read],
          breadcrumb: ({ id, data }) => ({
            label: data?.label ?? `Shoe ${id}`,
            href: `/dashboard/shoe/${id}`,
            permission: [permissions.product.read],
          }),
        },

        {
          label: "Edit Shoes",
          href: "/dashboard/shoe/[id]/edit",
          permission: [permissions.product.edit],

          breadcrumb: ({ id, data }) => ({
            label: data?.label ?? `Edit Shoe ${id}`,
            href: `/dashboard/shoe/${id}/edit`,
            permission: [permissions.product.edit],
          }),
        },
      ],
    },
    {
      label: "Create Shoe",
      href: "/dashboard/shoe/create",
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
