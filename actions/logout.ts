"use server";

import { redirect } from 'next/dist/client/components/navigation';

import { signOut } from '@/auth';

export async function logout() {
  await signOut({ redirect: false });
  redirect("/login");
}
