"use server";

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

import {
  auth,
  signIn,
} from '@/auth';

type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      return { error: "Invalid credentials" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials" };
    }

    return { error: "Something went wrong" };
  }

  // 🔑 Session neu laden (wichtig!)
  const session = await auth();

  if (!session?.user) {
    return { error: "Authentication failed" };
  }

  // 🎯 Role-based Redirect
  switch (session.user.role) {
    case "ADMIN":
    case "EDITOR":
      redirect("/dashboard");
    case "CUSTOMER":
    default:
      redirect("/");
  }
}
