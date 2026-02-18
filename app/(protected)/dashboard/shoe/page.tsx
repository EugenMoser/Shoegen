import { JSX } from "react";

import { getShoes } from "@/modules/shoes/actions/getShoe";
import { ShoeCard } from "@/modules/shoes/components/ShoeCard";

interface ShoePageProps {}

export default async function ShoePage({}: ShoePageProps): Promise<JSX.Element> {
  const shoesResult = await getShoes();

  if (!shoesResult.success) {
    return <div>Error: {shoesResult.error}</div>;
  }

  const shoes = shoesResult.data || [];

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

      {shoes.length === 0 && <p>Keine Schuhe verfügbar.</p>}
    </>
  );
}
