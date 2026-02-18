import { getActiveShoes } from "@/modules/shoes/actions/getActiveShoes";
import ProductCard from "@/modules/shoes/components/ProductCard";
import { Shoe } from "@/modules/shoes/types";

interface ShopPageProps {}

export default async function ShopPage({}: ShopPageProps): Promise<React.JSX.Element> {
  const shoesResult = await getActiveShoes();

  if (!shoesResult.success) {
    return <div>Error: {shoesResult.error}</div>;
  }

  const activeShoes = shoesResult.data || [];
  return (
    <>
      <h1>Shop Page</h1>
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
