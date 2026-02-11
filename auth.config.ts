import type { NextAuthConfig } from 'next-auth';

import type { Role } from '@/modules/auth/types';

// This file is used by the proxy, which runs on the Edge runtime.
// The Edge runtime does not support certain Node.js modules like 'bcrypt' or 'prisma'.
// By keeping this configuration separate and free of Node.js logic/imports,
// we ensure the proxy can run successfully, while the full 'auth.ts'
// handles the heavier authentication logic (DB access, password hashing) in a Node.js environment.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  providers: [], // Providers are defined in auth.ts, this is just for the global config
} satisfies NextAuthConfig;
