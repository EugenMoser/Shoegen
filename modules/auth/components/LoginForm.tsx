"use client";

import { useActionState } from "react";

import Form from "next/form";

import { Button } from "@/components/ui/button";
import { useActionResultHandler } from "@/hooks/useActionResultHandler";
import { ActionResult } from "@/types/action";

import { login } from "../actions/login";

const initialState: ActionResult = {
  success: false,
  error: "",
};

export default function LoginForm(): React.JSX.Element {
  const [state, action, isPending] = useActionState<
    ActionResult,
    FormData
  >(login, initialState);

  useActionResultHandler(state);

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

      <Button
        disabled={isPending}
        type="submit"
      >
        Login
      </Button>
    </Form>
  );
}
