"use client";

import { useActionState } from "react";

import Form from "next/form";

import { ActionResult } from "@/types/action";

import { login } from "../../modules/auth/actions/login";

const initialState: ActionResult = {
  success: false,
  error: "",
};

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <Form action={action}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <button
        disabled={isPending}
        type="submit"
      >
        Login
      </button>

      {state?.success === false && (
        <p className="text-red-600">{state.error}</p>
      )}
    </Form>
  );
}
