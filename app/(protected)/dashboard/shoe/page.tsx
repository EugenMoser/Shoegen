import { JSX } from 'react/jsx-dev-runtime';

import { getShoes } from '@/modules/shoes/actions/getShoe';
import { ShoeCard } from '@/modules/shoes/components/ShoeCard';

interface ShoePageProps {}

export default async function ShoePage({}: ShoePageProps): Promise<JSX.Element> {
  const shoes = await getShoes();
  return (
    <>
      <h1>Shoe Page</h1>
      <ul className="space-y-4">
        {shoes.map((shoe) => (
          <li key={shoe.id}>
            <ShoeCard shoe={shoe} />
          </li>
        ))}
      </ul>
    </>
  );
}
