import {
  Season,
  ShoeCategory,
  ShoeColor,
  ShoeUsage,
  Terrain,
} from '../../types';

interface ProductAttributesProps {
  shoe: {
    category: ShoeCategory[];
    usage: ShoeUsage[];
    terrain: Terrain[];
    season: Season[];
    waterproof: boolean;
    colors: ShoeColor[];
  };
}

export default function ProductAttributes({
  shoe,
}: ProductAttributesProps): React.JSX.Element {
  return (
    <>
      <h1>Product Attributes</h1>
      <p>Kategorie: {shoe.category.join(", ")}</p>
      <p>Verwendung: {shoe.usage.join(", ")}</p>
      <p>Gelände: {shoe.terrain.join(", ")}</p>
      <p>Saison: {shoe.season.join(", ")}</p>
      <p>Wasserdicht: {shoe.waterproof ? "Ja" : "Nein"}</p>
      <p>Farben: {shoe.colors.join(", ")}</p>
    </>
  );
}
