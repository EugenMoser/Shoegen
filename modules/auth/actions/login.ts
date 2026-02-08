"use server";

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import {
  ActionResult,
  error,
} from '@/types/action';

export async function login(
  _prevState: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return error("Ungültige Anmeldedaten", 401);
    }

    // important: re-throw unexpected errors
    throw err;
  }
}
