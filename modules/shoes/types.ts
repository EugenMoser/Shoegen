export const SHOE_CATEGORIES = [
  "SNEAKER",
  "RUNNING",
  "HIKING",
  "SANDAL",
  "BOOT",
] as const;

export const SHOE_USAGES = [
  "DAILY",
  "SPORTS",
  "CASUAL",
  "RUNNING",
  "HIKING",
  "TREKKING",
  "WORK",
] as const;

export const SEASONS = [
  "SPRING",
  "SUMMER",
  "AUTUMN",
  "WINTER",
  "ALL_SEASON",
] as const;

export const TERRAINS = [
  "CITY",
  "TRAIL",
  "MOUNTAIN",
  "INDOOR",
  "OUTDOOR",
] as const;

export const CURRENCIES = ["USD", "EUR", "GBP", "JPY"] as const;

export const SHOE_SIZES = [
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
] as const;

export type Shoe = {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  currency: string;

  sizes: string[];
  isActive: boolean;

  category: string[];
  usage: string[];
  terrain: string[];
  season: string[];
  waterproof: boolean;
};

export type ShoeCategory = (typeof SHOE_CATEGORIES)[number];
export type ShoeUsage = (typeof SHOE_USAGES)[number];
export type Season = (typeof SEASONS)[number];
export type Terrain = (typeof TERRAINS)[number];
export type Currency = (typeof CURRENCIES)[number];
export type ShoeSize = (typeof SHOE_SIZES)[number];
