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

export type ShoeCategory = (typeof SHOE_CATEGORIES)[number];
export type ShoeUsage = (typeof SHOE_USAGES)[number];
export type Season = (typeof SEASONS)[number];
export type Terrain = (typeof TERRAINS)[number];
