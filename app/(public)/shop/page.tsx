import { getActiveShoes } from '@/modules/shoes/actions/getActiveShoes';
import ProductCard from '@/modules/shoes/components/ProductCard';
import { Shoe } from '@/modules/shoes/types';

interface ShopPageProps {}

export default async function ShopPage({}: ShopPageProps): Promise<React.JSX.Element> {
  const activeShoes: Shoe[] = await getActiveShoes();

  return (
    <>
      <h1>Shop Page</h1>
      <p>Hier findest du eine Auswahl unserer besten Schuhe!</p>
      <ul className="flex flex-row min-w-full justify-center flex-wrap gap-4">
        {activeShoes.map((shoe) => (
          <ProductCard
            key={shoe.id}
            shoe={shoe}
          />
        ))}
      </ul>
    </>
  );
}
