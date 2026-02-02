"use client";

import { useActionState } from "react";

import Form from "next/form";

import { permissions } from "@/modules/auth/permissions";
import { Result } from "@/types/result";

import { updateShoe } from "../actions/updateShoe";
import { ShoeButton } from "./ShoeButton";

export function UpdateShoeForm({ shoeId }: { shoeId: string }) {
  const updateWithId = updateShoe.bind(null, shoeId);

  const [state, action, isPending] = useActionState<
    Result | null,
    FormData
  >(updateWithId, null);

  return (
    <Form action={action}>
      <input name="name" />

      <ShoeButton
        disabled={isPending}
        title="Update"
        permissions={[permissions.product.update]}
      />

      {state?.success === false && <p>{state.error}</p>}
    </Form>
  );
}
