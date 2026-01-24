import { permissions } from '@/modules/auth/permissions';

export type Role = "ADMIN" | "EDITOR" | "CUSTOMER";

// eg: permissions['PRODUCTS']['CREATE'] = "product:create"
export type Permission =
  (typeof permissions)[keyof typeof permissions][keyof (typeof permissions)[keyof typeof permissions]];
