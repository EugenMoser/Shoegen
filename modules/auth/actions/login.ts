"use server";

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import {
  ActionResult,
  error,
  success,
} from '@/types/action';

export async function login(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });

    return success("Erfolgreich eingeloggt");
  } catch (err) {
    if (err instanceof AuthError) {
      return error("Ungültige Anmeldedaten", 401);
    }

    // important: re-throw unexpected errors
    throw err;
  }
}
