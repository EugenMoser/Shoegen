import { Role } from '@/modules/auth/types';
import {
  filterNavigationByRole,
} from '@/modules/navigation/filterNavigationByRole';

// Mock the permission config to have stable tests independent of changes in the real config
jest.mock("@/modules/navigation/dashboardNavigationConfig", () => ({
  dashboardNavigationConfig: [
    {
      label: "Dashboard",
      href: "/dashboard",
      permission: ["dashboard:access"],
    },
    {
      label: "Products",
      href: "/dashboard/products",
      permission: ["product:read"],
      children: [
        {
          label: "Create",
          href: "/dashboard/products/create",
          permission: ["product:create"],
        },
      ],
    },
    {
      label: "Public",
      href: "/public",
      // No permission required
    },
  ],
}));

// We also need to mock rolePermissions cause filterNavigation uses hasPermission which uses rolePermissions
jest.mock("@/modules/auth/permissions", () => {
  const original = jest.requireActual("@/modules/auth/permissions");
  return {
    ...original,
    hasPermission: (role: Role | undefined, permission: string) => {
      // Mock simple logic for test
      if (!role) return false;
      if (role === "ADMIN") return true;
      if (role === "VIEWER") {
        return permission === "product:read";
      }
      return false;
    },
  };
});

describe("filterNavigationByRole", () => {
  it("should return all items for ADMIN", () => {
    const items = filterNavigationByRole("ADMIN");
    expect(items).toHaveLength(3);
    // Check children
    const products = items.find((i) => i.label === "Products");
    expect(products?.children).toHaveLength(1);
  });

  it("should return limited items for VIEWER", () => {
    // VIEWER has product:read, but NO dashboard:access, NO product:create
    const items = filterNavigationByRole("VIEWER");

    // Should have "Products" and "Public"
    // "Dashboard" requires dashboard:access -> filtered out
    expect(items).toHaveLength(2);
    expect(items.find((i) => i.label === "Dashboard")).toBeUndefined();
    expect(items.find((i) => i.label === "Products")).toBeDefined();
    expect(items.find((i) => i.label === "Public")).toBeDefined();

    // Check children of Products
    const products = items.find((i) => i.label === "Products");
    // "Create" requires product:create -> filtered out
    expect(products?.children).toHaveLength(0);
  });

  it("should return only public items for undefined role", () => {
    const items = filterNavigationByRole(undefined);
    expect(items).toHaveLength(1);
    expect(items[0].label).toBe("Public");
  });
});
