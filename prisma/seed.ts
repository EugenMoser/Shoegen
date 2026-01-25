import { hash } from 'bcryptjs';
import { config } from 'dotenv';

import { prisma } from '@/lib/db/prisma';

// Load environment variables
config();

async function main() {
  const email = "user1@shoes.local";
  const password = "user111";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "EDITOR",
    },
  });

  console.log("Admin user created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
