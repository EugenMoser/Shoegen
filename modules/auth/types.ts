import { permissions } from './permissions';

export type Role = "ADMIN" | "EDITOR" | "VIEWER";

// eg: permissions['PRODUCT']['CREATE'] = "product:create"
// mapping union type of all permission strings
export type Permission = {
  [K in keyof typeof permissions]: (typeof permissions)[K][keyof (typeof permissions)[K]];
}[keyof typeof permissions];
