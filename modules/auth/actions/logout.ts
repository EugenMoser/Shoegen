"use server";

import { redirect } from "next/dist/client/components/navigation";

import { signOut } from "@/auth";
import { serverAuthGuard } from "@/modules/auth/serverAuthGuard";

export async function logout() {
  await serverAuthGuard();
  await signOut({ redirect: false });
  redirect("/login");
}
