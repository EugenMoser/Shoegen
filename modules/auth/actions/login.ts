"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { Result } from "@/types/result";

export async function login(
  _prevState: Result | null,
  formData: FormData,
): Promise<Result | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid credentials" };
    }

    // important: re-throw unexpected errors
    throw error;
  }
}
