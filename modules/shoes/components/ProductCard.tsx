import Link from 'next/link';

import { Shoe } from '../types';

interface ProductCardProps {
  shoe: Shoe;
}

export default function ProductCard({
  shoe,
}: ProductCardProps): React.JSX.Element {
  const sizeOptions =
    shoe.sizes.map((size) => ({ size: size.size, stock: size.stock })) ||
    [];

  return (
    <li
      key={shoe.id}
      className="border border-border bg-card items-center min-w-48 max-w-full gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-accent hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    >
      <h2>{shoe.name}</h2>
      <p>{shoe.description}</p>
      <p>Marke: {shoe.brand}</p>
      <p>Kategorie: {shoe.category}</p>
      <p>Größen: {sizeOptions.map((option) => option.size).join(" | ")}</p>
      <p>Nutzung: {shoe.usage}</p>
      <p>Gelände: {shoe.terrain}</p>
      <p>Saison: {shoe.season}</p>
      <p>Wasserdicht: {shoe.waterproof ? "Ja" : "Nein"}</p>
      <p>
        {shoe.price} {shoe.currency}
      </p>
      <Link href={`/shop/shoes/${shoe.id}`}>Details ansehen</Link>
    </li>
  );
}
