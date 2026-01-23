"use server";

import { AuthError } from 'next-auth';

import { signIn } from '@/auth/auth';

type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials" };
    }

    return { error: "Something went wrong" };
  }
}
