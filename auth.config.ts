import type { NextAuthConfig } from "next-auth";

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
      const isOnLogin = nextUrl.pathname.startsWith("/login");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      } else if (isOnLogin && isLoggedIn) {
        // If already logged in and trying to access login page, redirect to dashboard
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Providers are defined in auth.ts, this is just for the global config
} satisfies NextAuthConfig;
