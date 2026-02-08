"use server";

import { log } from 'console';

import { prisma } from '@/lib/db/prisma';
import { permissions } from '@/modules/auth/permissions';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';

import { Shoe } from '../types';

export async function getShoes(): Promise<Shoe[]> {
  await serverAuthGuard([permissions.product.read], false);
  const shoes = await prisma.shoe.findMany({
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
  log("----->>>>> shoes in getShoes action", shoes);
  return shoes as unknown as Shoe[];
}

// Get a single shoe by ID, with auth guard
export async function GetShoeById(id: string) {
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

  if (!shoe) return null;

  return {
    ...shoe,
    sizes: shoe.sizes as Shoe["sizes"],
  };
}
