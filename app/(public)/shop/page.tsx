import { Suspense } from 'react';

import AdvisorSidebar from '@/modules/advisor/components/AdvisorSidebar';
import {
  getShoeBrands,
  getShoePrices,
  getShoes,
} from '@/modules/shoes/actions/getShoe';
import FilterBar from '@/modules/shoes/components/FilterBar';
import ProductCard from '@/modules/shoes/components/ProductCard';
import ShoeHero from '@/modules/shoes/components/ShoeHero';
import ShoeSearch from '@/modules/shoes/components/ShoeSearch';
import {
  Season,
  Shoe,
  ShoeCategory,
  ShoeColor,
  Terrain,
} from '@/modules/shoes/types';

interface ShopPageProps {
  searchParams?: Promise<{
    query?: string;
    brands?: string; // e.g. "Nike", "Adidas"
    categories?: ShoeCategory; // e.g. "SNEAKER,BOOT"
    terrains?: Terrain; // e.g. "TRAIL,MOUNTAIN"
    seasons?: Season; // e.g. "SUMMER,WINTER"
    waterproof?: string; // "true"
    colors?: ShoeColor; // e.g. "Rot,Blau"
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps): Promise<React.JSX.Element> {
  const backupPriceRange = [1, 1000]; // Default price range if not provided

  // Extract query from search parameters
  const params = await searchParams;
  const searchQuery = params?.query || undefined;
  const brands = params?.brands?.split(",").filter(Boolean) as
    | string[]
    | undefined;
  const categories = params?.categories?.split(",").filter(Boolean) as
    | ShoeCategory[]
    | undefined;
  const terrains = params?.terrains?.split(",").filter(Boolean) as
    | Terrain[]
    | undefined;
  const seasons = params?.seasons?.split(",").filter(Boolean) as
    | Season[]
    | undefined;
  const waterproof = params?.waterproof ? true : undefined; // don't filter by waterproof if not provided
  const colors = params?.colors?.split(",").filter(Boolean) as
    | ShoeColor[]
    | undefined;
  const minPrice = params?.minPrice
    ? parseFloat(params.minPrice)
    : undefined;
  const maxPrice = params?.maxPrice
    ? parseFloat(params.maxPrice)
    : undefined;

  // Fetch shoes and price range in parallel
  const [shoesResult, priceResult, brandsResult] = await Promise.all([
    getShoes({
      isActive: true,
      searchQuery,
      brands,
      categories,
      terrains,
      seasons,
      waterproof,
      colors,
      minPrice,
      maxPrice,
    }),
    getShoePrices(),
    getShoeBrands(),
  ]);

  if (!shoesResult.success) {
    return <div>Error: {shoesResult.error}</div>;
  }

  if (!priceResult.success) {
    return <div>Error: {priceResult.error}</div>;
  }
  if (!brandsResult.success) {
    return <div>Error: {brandsResult.error}</div>;
  }

  const activeShoes: Shoe[] = shoesResult.data || [];
  const priceRange: number[] = priceResult.data || backupPriceRange; // Default price range if not provided
  const shoeBrands: string[] = brandsResult.data || [];

  return (
    <div className="flex flex-col gap-4 min-h-screen">
      <ShoeHero
        activeShoesLength={activeShoes.length}
        params={params}
      />

      <AdvisorSidebar />
      <div className=" flex flex-1 mb-4">
        <Suspense fallback={<div>Loading search...</div>}>
          <ShoeSearch />
        </Suspense>

        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterBar
            priceRange={priceRange as [number, number]}
            shoeBrands={shoeBrands}
          />
        </Suspense>
      </div>

      <h3>Hier findest du eine Auswahl unserer besten Schuhe!</h3>

      {activeShoes.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-w-full justify-center  gap-4">
          {activeShoes.map((shoe) => (
            <ProductCard
              key={shoe.id}
              shoe={shoe}
            />
          ))}
        </ul>
      )}

      {activeShoes.length === 0 && <p>Keine Schuhe verfügbar.</p>}
    </div>
  );
}
