import { prisma } from '@/lib/db/prisma';

const COLORS = [
  "BLACK",
  "WHITE",
  "GREY",
  "BROWN",
  "BEIGE",
  "RED",
  "BLUE",
  "GREEN",
  "YELLOW",
  "ORANGE",
  "PINK",
  "PURPLE",
  "MULTICOLOR",
] as const;

function randomColors() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * 3) + 1; // 1–3 Farben
  return shuffled.slice(0, count);
}

async function main() {
  const shoes = await prisma.shoe.findMany({ select: { id: true } });

  for (const shoe of shoes) {
    await prisma.shoe.update({
      where: { id: shoe.id },
      data: { colors: randomColors() },
    });
  }

  console.log(`${shoes.length} Schuhe aktualisiert.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
