import { hash } from 'bcryptjs';
import { config } from 'dotenv';

import { prisma } from '@/lib/db/prisma';

// Load environment variables
config();

async function main() {
  const email = "admin@shoes.local";
  const password = "admin123";

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
      role: "ADMIN",
    },
  });

  console.log("Admin user created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
