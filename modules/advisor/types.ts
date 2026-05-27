import type {
  Season,
  ShoeCategory,
  Terrain,
} from '@/modules/shoes/types';

export interface FilterShoesParams {
  brands?: string; // e.g. "Nike,Adidas"
  categories?: ShoeCategory[];
  terrains?: Terrain[];
  seasons?: Season[];
  waterproof?: true; // Only filter for waterproof shoes
  minPrice?: number;
  maxPrice?: number;
}
