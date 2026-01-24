"use client";

import {
  useActionState,
  useEffect,
} from 'react';

import Form from 'next/form';
import { useRouter } from 'next/navigation';

import { login } from '../../actions/login';

export default function LoginPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(login, {});

  // Redirect to dashboard on successful login
  useEffect(() => {
    if (
      !isPending &&
      state.error === undefined &&
      Object.keys(state).length > 0
    ) {
      router.push("/dashboard");
    }
  }, [state, isPending, router]);

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
      {state.error && <p>{state.error}</p>}
      <button
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </Form>
  );
}
