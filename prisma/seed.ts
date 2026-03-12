import { hash } from "bcryptjs";
import { config } from "dotenv";

import { prisma } from "@/lib/db/prisma";
import shoeMockup from "@/modules/shoes/shoeMockup.json";

// Load environment variables
config();

const users = [
  { email: "admin@shoegen.dev",  password: "Admin1234!",  role: "ADMIN"  as const },
  { email: "editor@shoegen.dev", password: "Editor1234!", role: "EDITOR" as const },
  { email: "viewer@shoegen.dev", password: "Viewer1234!", role: "VIEWER" as const },
];

async function seedUsers() {
  for (const user of users) {
    const hashedPassword = await hash(user.password, 12);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { email: user.email, password: hashedPassword, role: user.role },
    });
    console.log(`[users] ${user.role} — ${user.email}`);
  }
}

async function seedShoes() {
  const existingCount = await prisma.shoe.count();
  if (existingCount > 0) {
    console.log(`[shoes] already seeded (${existingCount} shoes), skipping`);
    return;
  }

  for (const shoeData of shoeMockup) {
    const createdShoe = await prisma.shoe.create({
      data: {
        name: shoeData.name,
        description: shoeData.description,
        price: shoeData.price,
        brand: shoeData.brand,
        currency: shoeData.currency as any,
        images: shoeData.images ?? [],
        isActive: shoeData.isActive,
        category: shoeData.category as any,
        usage: shoeData.usage as any,
        terrain: shoeData.terrain as any,
        season: shoeData.season as any,
        waterproof: shoeData.waterproof,
      },
    });

    if (Array.isArray(shoeData.sizes)) {
      for (const size of shoeData.sizes) {
        await prisma.shoeSize.create({
          data: { shoeId: createdShoe.id, size: parseFloat(size), stock: 10 },
        });
      }
    }
  }

  console.log(`[shoes] ${shoeMockup.length} shoes seeded`);
}

async function main() {
  await seedUsers();
  await seedShoes();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
