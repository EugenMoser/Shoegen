"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ActionResult } from "@/types/action";

type UseActionResultHandlerOptions = {
  successRedirect?: string;
  errorRedirect?: string;
  successDelay?: number;
  errorDelay?: number;
};

export function useActionResultHandler(
  state: ActionResult,
  options?: UseActionResultHandlerOptions,
) {
  const router = useRouter();
  const {
    successRedirect,
    errorRedirect,
    successDelay = 1500,
    errorDelay = 1500,
  } = options || {};

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Erfolgreich");
      if (successRedirect) {
        setTimeout(() => router.push(successRedirect), successDelay);
      }
    }

    if (state.success === false) {
      toast.error(state.error || "Ein Fehler ist aufgetreten");
      if (errorRedirect) {
        setTimeout(() => router.push(errorRedirect), errorDelay);
      }
      // Handle specific error codes if needed
      if (state.code === 401 && !errorRedirect) {
        setTimeout(() => router.push("/login"), errorDelay);
      }
    }
  }, [
    state,
    router,
    successRedirect,
    errorRedirect,
    successDelay,
    errorDelay,
  ]);
}
