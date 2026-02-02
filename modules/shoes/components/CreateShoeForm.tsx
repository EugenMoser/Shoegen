"use client";

import { use, useActionState, useEffect } from "react";

import Form from "next/form";
import { redirect } from "next/navigation";

import { permissions } from "@/modules/auth/permissions";

import { createShoe } from "../actions/createShoe";
import { ShoeButton } from "./ShoeButton";

export function CreateShoeForm() {
  const [state, action, isPending] = useActionState(createShoe, null);

  useEffect(() => {
    if (state?.success) {
      setTimeout(() => redirect("/dashboard/shoes"), 1500);
    }
  }, [state]);

  return (
    <Form
      action={action}
      className="space-y-4"
    >
      <input
        name="name"
        placeholder="Name"
        required
      />
      <input
        name="brand"
        placeholder="Brand"
        required
      />
      <input
        name="price"
        type="number"
        required
      />

      <ShoeButton
        title="Create Shoe"
        disabled={isPending}
        permissions={[permissions.product.create]}
      />

      {state?.success === false && (
        <p className="text-red-600">{state.error}</p>
      )}
      {state?.success === true && (
        <p className="text-green-500">{state.message}</p>
      )}
    </Form>
  );
}
