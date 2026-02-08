"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteShoe } from "../actions/deleteShoe";

export function DeleteShoeButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteShoe(id);
      
      if (result.success) {
        toast.success(result.message || "Schuh gelöscht");
        router.push("/dashboard/shoe");
      } else {
        toast.error(result.error);
        // Handle auth errors
        if (result.code === 401) {
          router.push("/login");
        }
      }
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
