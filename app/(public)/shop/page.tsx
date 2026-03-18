import { Suspense } from 'react';

import ShoeFilter from '@/components/ShoeFilter';
import ShoeSearch from '@/components/ShoeSearch';
import { getShoes } from '@/modules/shoes/actions/getShoe';
import ProductCard from '@/modules/shoes/components/ProductCard';

interface ShopPageProps {
  searchParams?: Promise<{ searchQuery?: string }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps): Promise<React.JSX.Element> {
  // Extract query from search parameters
  const params = await searchParams;
  const searchQuery = params?.searchQuery || undefined;
  // Fetch active shoes with optional search query, if searchQuery is undefined, it will fetch all active shoes
  const shoesResult = await getShoes({ isActive: true, searchQuery });

  if (!shoesResult.success) {
    return <div>Error: {shoesResult.error}</div>;
  }

  const activeShoes = shoesResult.data || [];
  return (
    <>
      <h1>Shop Page</h1>
      <div className=" flex mb-4">
        <Suspense fallback={<div>Loading search...</div>}>
          <ShoeSearch />
        </Suspense>
        <Suspense fallback={<div>Loading filters...</div>}>
          <ShoeFilter shoes={activeShoes} />
        </Suspense>
      </div>
      <p>Hier findest du eine Auswahl unserer besten Schuhe!</p>

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
