// help function for easily requiring permissions in server components and actions

import { Session } from "next-auth";

import { serverAuthGuard } from "./serverAuthGuard";
import { Permission } from "./types";

export default async function requirePermission(
  permission: Permission[],
): Promise<Session> {
  return await serverAuthGuard({ permission: permission });
}
