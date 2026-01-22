import { prisma } from "@/lib/prisma";

import type { Role } from "./types";

export type UserEntity = {
  id: string;
  email: string;
  role: Role;
  password: string;
};

export const userRepository = {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      password: user.password,
    };
  },
};
