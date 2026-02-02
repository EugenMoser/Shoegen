"use client";

import { useTransition } from "react";

import { deleteShoe } from "../actions/deleteShoe";

export function DeleteShoeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteShoe(id);
        })
      }
    >
      Delete
    </button>
  );
}
