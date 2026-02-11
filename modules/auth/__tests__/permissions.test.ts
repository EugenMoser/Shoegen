import {
  hasPermission,
  permissions,
} from '../permissions';
import { Role } from '../types';

describe("hasPermission", () => {
  it("should return true for ADMIN with product:delete permission", () => {
    const role: Role = "ADMIN";
    const permission = permissions.product.delete;
    expect(hasPermission(role, permission)).toBe(true);
  });

  it("should return true for ADMIN with user:manage permission", () => {
    const role: Role = "ADMIN";
    const permission = permissions.user.manage;
    expect(hasPermission(role, permission)).toBe(true);
  });

  it("should return false for EDITOR with product:delete permission", () => {
    const role: Role = "EDITOR";
    const permission = permissions.product.delete;
    expect(hasPermission(role, permission)).toBe(false);
  });

  it("should return true for EDITOR with product:edit permission", () => {
    const role: Role = "EDITOR";
    const permission = permissions.product.edit;
    expect(hasPermission(role, permission)).toBe(true);
  });

  it("should return false for VIEWER with product:create permission", () => {
    const role: Role = "VIEWER";
    const permission = permissions.product.create;
    expect(hasPermission(role, permission)).toBe(false);
  });

  it("should return false if role is undefined", () => {
    const role: Role | undefined = undefined;
    const permission = permissions.product.read;
    expect(hasPermission(role, permission)).toBe(false);
  });
});
