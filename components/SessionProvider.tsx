"use client";

import type { Session } from "next-auth";
import dynamic from "next/dynamic";

const Provider = dynamic(() => import("@/components/SessionProvider"), {
  ssr: false,
});
export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return <Provider session={session}>{children}</Provider>;
}
