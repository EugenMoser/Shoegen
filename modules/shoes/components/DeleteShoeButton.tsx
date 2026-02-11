"use client";

import { useTransition } from 'react';

import { useActionResultHandler } from '@/hooks/useActionResultHandler';
import { ActionResult } from '@/types/action';

import { deleteShoe } from '../actions/deleteShoe';

export function DeleteShoeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result: ActionResult = await deleteShoe(id);
      useActionResultHandler(result, {
        successRedirect: "/dashboard/shoe",
        errorRedirect: "/dashboard",
      });
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Lösche..." : "Löschen"}
    </button>
  );
}
