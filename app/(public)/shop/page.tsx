import { Suspense } from 'react';

import Search from '@/components/Search';
import { getShoes } from '@/modules/shoes/actions/getShoe';
import ProductCard from '@/modules/shoes/components/ProductCard';

interface ShopPageProps {
  searchParams?: Promise<{ query?: string }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps): Promise<React.JSX.Element> {
  // Extract query from search parameters
  const params = await searchParams;
  const query = params?.query || undefined;
  // Fetch active shoes with optional search query, if query is undefined, it will fetch all active shoes
  const shoesResult = await getShoes({ isActive: true, query });

  if (!shoesResult.success) {
    return <div>Error: {shoesResult.error}</div>;
  }

  const activeShoes = shoesResult.data || [];
  return (
    <>
      <h1>Shop Page</h1>
      <Suspense fallback={<div>Loading search...</div>}>
        <Search />
      </Suspense>
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
