import { config } from "dotenv";

import { prisma } from "@/lib/db/prisma";
import shoeMockup from "@/modules/shoes/shoeMockup.json";

// Load environment variables
config();

async function main() {
  // -----------Seed admin user
  // const email = "user1@shoes.local";
  // const password = "user111";

  // const existing = await prisma.user.findUnique({
  //   where: { email },
  // });

  // if (existing) {
  //   console.log("Admin already exists");
  //   return;
  // }

  // const hashedPassword = await hash(password, 12);

  // await prisma.user.create({
  //   data: {
  //     email,
  //     password: hashedPassword,
  //     role: "EDITOR",
  //   },
  // });

  // console.log("Admin user created");

  // -----------Seed shoe data
  const shoeMock = shoeMockup;

  for (const shoeData of shoeMock) {
    // 1. Schuh anlegen (ohne sizes)
    await prisma.shoe.create({
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

    // 2. ShoeSize-Einträge für jede Größe anlegen
    // if (Array.isArray(shoeData.sizes)) {
    //   for (const size of shoeData.sizes) {
    //     await prisma.shoeSize.create({
    //       data: {
    //         shoeId: createdShoe.id,
    //         size: parseFloat(size),
    //         stock: 10, // Default-Stock
    //       },
    //     });
    //   }
    // }
  }

  console.log("Shoe mock data seeded (mit ShoeSize)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
