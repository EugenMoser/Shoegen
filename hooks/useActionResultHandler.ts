"use client";

import {
  useEffect,
  useRef,
} from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ActionResult } from '@/types/action';

type UseActionResultHandlerOptions = {
  successRedirect?: string;
  errorRedirect?: string;
};

export function useActionResultHandler(
  state: ActionResult,
  options?: UseActionResultHandlerOptions,
) {
  const router = useRouter();
  const { successRedirect, errorRedirect } = options || {};
  const hasHandledRef = useRef(false);

  useEffect(() => {
    // Skip initial/empty state
    if (!state || (state.success === false && !state.error)) {
      return;
    }

    if (state.success) {
      if (state.message) {
        toast.success(state.message);
      }
      console.log("----->>>>> test");
      window.location.href = "/dashboard";
    } else if (state.success === false && state.error) {
      toast.error(state.error);

      if (errorRedirect) {
        router.push(errorRedirect);
      }
    }
  }, [state, router, successRedirect, errorRedirect]);
}
