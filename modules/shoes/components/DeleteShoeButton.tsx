"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { useActionResultHandler } from "@/hooks/useActionResultHandler";
import { ActionResult } from "@/types/action";

import { deleteShoe } from "../actions/deleteShoe";

export function DeleteShoeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
