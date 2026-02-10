import type { NextAuthConfig } from "next-auth";

import { hasPermission, permissions } from "./modules/auth/permissions";

// This file is used by the middleware, which runs on the Edge runtime.
// The Edge runtime does not support certain Node.js modules like 'bcrypt' or 'prisma'.
// By keeping this configuration separate and free of Node.js logic/imports,
// we ensure the middleware can run successfully, while the full 'auth.ts'
// handles the heavier authentication logic (DB access, password hashing) in a Node.js environment.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if user is authenticated
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const role = auth?.user?.role;

      // If the user is trying to access the dashboard, check authentication and permissions
      if (isOnDashboard) {
        if (!isLoggedIn) return false;

        if (!hasPermission(role, permissions.dashboard.access)) {
          // If the user is authenticated but does not have permission, redirect to unauthorized page
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
        return true;
      }
    },
  },
  providers: [], // Providers are defined in auth.ts, this is just for the global config
} satisfies NextAuthConfig;
