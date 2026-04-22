interface ShoeHeroProps {
  activeShoesLength: number;
  params?: Partial<{
    query?: string;
    brands?: string; // comma-separated list of brands
    categories?: string; // comma-separated list of categories
    terrains?: string; // comma-separated list of terrains
    seasons?: string; // comma-separated list of seasons
    waterproof?: string; // "true"
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default function ShoeHero({
  activeShoesLength,
  params,
}: ShoeHeroProps): React.JSX.Element {
  return (
    <section className="py-8 border-b">
      <h1 className="text-3xl font-bold">Finde deinen perfekten Schuh</h1>
      <p className="text-muted-foreground mt-1">
        {activeShoesLength} Modelle{" "}
        {params && Object.keys(params).length > 0
          ? "gefunden"
          : "verfügbar"}
      </p>
    </section>
  );
}
