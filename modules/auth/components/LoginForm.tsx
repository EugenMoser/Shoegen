"use client";

import { useActionState } from "react";

import Form from "next/form";

import { login } from "../actions/login";

interface LoginFormProps {}

export default function LoginForm({}: LoginFormProps): React.JSX.Element {
  const [state, action] = useActionState(login, {});

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
      {state.error && <p className="text-red-600">{state.error}</p>}
      <button type="submit">Login</button>
    </Form>
  );
}
