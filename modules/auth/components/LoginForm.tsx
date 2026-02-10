"use client";

import { useActionState } from "react";

import Form from "next/form";

import { ActionResult } from "@/types/action";

import { login } from "../actions/login";

const initialState: ActionResult = {
  success: false,
  error: "",
};

export default function LoginForm(): React.JSX.Element {
  const [state, action] = useActionState<ActionResult, FormData>(
    login,
    initialState,
  );

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
      {state?.success === false && (
        <p className="text-red-600">{state.error}</p>
      )}
      <button type="submit">Login</button>
    </Form>
  );
}
