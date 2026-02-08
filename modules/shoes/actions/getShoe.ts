"use server";

import { prisma } from '@/lib/db/prisma';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';

import { Shoe } from '../types';

export default async function GetShoe(id: string) {
  await serverAuthGuard([permissions.product.read], false);
  const shoe = await prisma.shoe.findUnique({
    where: { id: id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      brand: true,
      currency: true,
      category: true,
      sizes: true,
      isActive: true,
      usage: true,
      terrain: true,
      season: true,
      waterproof: true,
    },
  });

  return shoe as Shoe | null;
}
