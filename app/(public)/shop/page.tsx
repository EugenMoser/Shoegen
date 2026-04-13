import { Suspense } from 'react';

import {
  getShoePrices,
  getShoes,
} from '@/modules/shoes/actions/getShoe';
import FilterBar from '@/modules/shoes/components/FilterBar';
import ProductCard from '@/modules/shoes/components/ProductCard';
import ShoeSearch from '@/modules/shoes/components/ShoeSearch';
import {
  Season,
  Shoe,
  ShoeCategory,
  Terrain,
} from '@/modules/shoes/types';

interface ShopPageProps {
  searchParams?: Promise<{
    query?: string;
    brands?: string; // e.g. "Nike,Adidas"
    categories?: string; // e.g. "SNEAKER,BOOT"
    terrains?: string;
    seasons?: string;
    waterproof?: string; // "true"
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
  const brands = params?.brands || undefined; // Convert comma-separated string to array
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
  const minPrice = params?.minPrice
    ? parseFloat(params.minPrice)
    : undefined;
  const maxPrice = params?.maxPrice
    ? parseFloat(params.maxPrice)
    : undefined;

  // Fetch shoes and price range in parallel
  const [shoesResult, priceResult] = await Promise.all([
    getShoes({
      isActive: true,
      searchQuery,
      brands,
      categories,
      terrains,
      seasons,
      waterproof,
      minPrice,
      maxPrice,
    }),
    getShoePrices(),
  ]);

  if (!shoesResult.success) {
    return <div>Error: {shoesResult.error}</div>;
  }

  if (!priceResult.success) {
    return <div>Error: {priceResult.error}</div>;
  }

  const activeShoes: Shoe[] = shoesResult.data || [];
  const priceRange: number[] = priceResult.data || backupPriceRange; // Default price range if not provided

  return (
    <>
      <h1>Shop Page</h1>
      <div className=" flex mb-4">
        <Suspense fallback={<div>Loading search...</div>}>
          <ShoeSearch />
        </Suspense>

        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterBar
            shoes={activeShoes}
            priceRange={priceRange as [number, number]}
          />
        </Suspense>
      </div>
      <h3>Hier findest du eine Auswahl unserer besten Schuhe!</h3>
      {params &&
        Object.keys(params).length === 0 &&
        activeShoes.length > 0 && (
          <p>Aktuell sind {activeShoes.length} Schuhe verfügbar.</p>
        )}
      {params &&
        Object.keys(params).length > 1 &&
        activeShoes.length > 0 && (
          <p>Aktuell hast du {activeShoes.length} Schuhe gefiltert.</p>
        )}
      {params &&
        Object.keys(params).length === 1 &&
        activeShoes.length > 0 && (
          <p>Aktuell hast du {activeShoes.length} Schuh gefiltert.</p>
        )}

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
    </>
  );
}
