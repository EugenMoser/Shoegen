"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { ActionResult, error, success } from "@/types/action";

export async function login(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("signIn result:", result);

    if (result?.error) {
      return error("Ungültige Anmeldedaten", 401);
    }

    return success("Erfolgreich eingeloggt");
  } catch (err) {
    console.error("Login error:", err);

    if (err instanceof AuthError) {
      return error("Ungültige Anmeldedaten", 401);
    }

    return error("Unbekannter Fehler", 500);
  }
}
