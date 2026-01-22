// Module augmentation for NextAuth to include custom user properties

// Can use global from next-auth (e.g. User, Session, JWT using 'import { User } from "next-auth";')
import NextAuth from "next-auth";

import type { Role } from "@/types/permissions";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
