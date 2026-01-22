import { compare } from "bcryptjs";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { prisma } from "@/lib/db/prisma";
import type { Role } from "@/modules/auth/types";
import { Admin } from "@/prisma/generated/client";

export const { auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Extra type check to satisfy TypeScript
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If no user found
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);

        // If password does not match
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role as Role,
        };
      },
    }),
  ],
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
});
