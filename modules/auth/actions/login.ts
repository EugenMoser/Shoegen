"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/auth";
import { Result } from "@/types/result";

export async function login(
  _prevState: Result | null,
  formData: FormData,
): Promise<Result> {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid credentials" };
    }

    return { success: false, error: "Something went wrong" };
  }

  redirect("/dashboard");
}
