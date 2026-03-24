import { Suspense } from "react";

import { getShoes } from "@/modules/shoes/actions/getShoe";
import FilterBar from "@/modules/shoes/components/FilterBar";
import ProductCard from "@/modules/shoes/components/ProductCard";
import ShoeFilter from "@/modules/shoes/components/ShoeFilter";
import ShoeSearch from "@/modules/shoes/components/ShoeSearch";
import { Shoe, ShoeCategory, Terrain } from "@/modules/shoes/types";
import { ActionResult } from "@/types/action";

interface ShopPageProps {
  searchParams?: Promise<{
    query?: string;
    categories?: string; // e.g. "SNEAKER,BOOT"
    terrains?: string;
    seasons?: string;
    waterproof?: string; // "true" or "false"
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps): Promise<React.JSX.Element> {
  // Extract query from search parameters
  const params = await searchParams;
  const searchQuery = params?.query || undefined;
  const categories = params?.categories?.split(",").filter(Boolean) as
    | ShoeCategory[]
    | undefined;
  const terrains = params?.terrains?.split(",").filter(Boolean) as
    | Terrain[]
    | undefined;
  // const seasons = params?.seasons?.split(",").filter(Boolean) as
  //   | Season[]
  //   | undefined;
  // const waterproof =
  //   params?.waterproof === "true"
  //     ? true
  //     : params?.waterproof === "false"
  //       ? false
  //       : undefined;
  // const minPrice = params?.minPrice
  //   ? parseFloat(params.minPrice)
  //   : undefined;
  // const maxPrice = params?.maxPrice
  //   ? parseFloat(params.maxPrice)
  //   : undefined;

  // Fetch active shoes with optional search query, if searchQuery is undefined, it will fetch all active shoes
  const shoesResult: ActionResult<Shoe[]> = await getShoes({
    isActive: true,
    searchQuery,
    categories,
    terrains,
    // seasons,
    // waterproof,
    // minPrice,
    // maxPrice,
  });

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
        {/* <Suspense fallback={<div>Loading filters...</div>}>
          <ShoeFilter shoes={activeShoes} />
        </Suspense> */}
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterBar shoes={activeShoes} />
        </Suspense>
      </div>
      <p>Hier findest du eine Auswahl unserer besten Schuhe!</p>
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
