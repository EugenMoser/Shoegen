"use client";

import { useActionState } from 'react';

import Form from 'next/form';
import { useRouter } from 'next/navigation';

import { login } from '../actions/login';

export default function LoginPage() {
  const router = useRouter();
  const [state, action] = useActionState(login, {});

  if (!state.error) {
    router.push("/dashboard");
  }

  return (
    <Form action={action}>
      <input
        name="email"
        type="email"
      />
      <input
        name="password"
        type="password"
      />
      {state.error && <p>{state.error}</p>}
      <button type="submit">Login</button>
    </Form>
  );
}
