"use client";

import type { Session } from "next-auth";
import dynamic from "next/dynamic";

const NextAuthSessionProvider = dynamic(
  () => import("next-auth/react").then((mod) => mod.SessionProvider),
  { ssr: false },
);

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
