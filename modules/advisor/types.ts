import type {
  Season,
  ShoeCategory,
  ShoeColor,
  Terrain,
} from '@/modules/shoes/types';

export interface FilterShoesParams {
  brands?: string; // e.g. "Nike,Adidas"
  categories?: ShoeCategory[];
  terrains?: Terrain[];
  seasons?: Season[];
  waterproof?: true; // Only filter for waterproof shoes
  colors?: ShoeColor[]; // e.g. ["Rot", "Blau"]
  minPrice?: number;
  maxPrice?: number;
}
