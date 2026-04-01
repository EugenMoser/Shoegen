"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  SEASONS,
  Shoe,
  SHOE_CATEGORIES,
  TERRAINS,
} from "@/modules/shoes/types";

import FilterDropdown from "./FilterDropdown";
import FilterSlider from "./FilterPriceSlider";
import FilterToggle from "./FilterToggle";

interface FilterBarProps {
  shoes?: Shoe[];
  priceRange: [number, number]; // [minPrice, maxPrice]
}

export default function FilterBar({
  shoes,
  priceRange,
}: FilterBarProps): React.JSX.Element {
  const searchParams = useSearchParams();

  const router = useRouter();

  const onMultiFilterChange = (paramName: string, value: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentValue = value.map((v) => v.trim()).filter(Boolean);
    // Toggle the selected value in the currentParams array
    const newParams = currentValue.length > 0 ? currentValue : [];
    if (newParams.length > 0) {
      params.set(paramName, newParams.join(","));
    } else {
      params.delete(paramName);
    }
    router.push(`?${params.toString()}`);
  };

  const onToggleFilterChange = (paramName: string, value: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    const currentValue = value ? "true" : "false";
    if (currentValue === "true") {
      params.set(paramName, "true");
    } else {
      params.delete(paramName);
    }
    router.push(`?${params.toString()}`);
  };

  const onPriceFilterChange = (minPrice: string, maxPrice: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    router.push(`?${params.toString()}`);
  };
  // Extract unique brands from shoes
  const extractUniqueBrands = (shoes: Shoe[] | undefined): string[] => {
    if (!shoes) return [];
    const brandsSet = new Set(shoes.map((shoe) => shoe.brand));
    return Array.from(brandsSet);
  };

  return (
    <div className="flex items-center space-x-4">
      <FilterDropdown
        label="Marken"
        paramName="brands"
        options={extractUniqueBrands(shoes)}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
      />
      <FilterDropdown
        label="Kategorien"
        paramName="categories"
        options={SHOE_CATEGORIES}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
      />
      <FilterDropdown
        label="Terrains"
        paramName="terrains"
        options={TERRAINS}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
      />
      <FilterDropdown
        label="Saisons"
        paramName="seasons"
        options={SEASONS}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
      />
      <FilterToggle
        label="Wasserdicht"
        paramName="waterproof"
        searchParams={searchParams}
        onFilterChange={onToggleFilterChange}
      />
      <FilterSlider
        label="Preis"
        minParamName="minPrice"
        maxParamName="maxPrice"
        options={priceRange} // Type assertion to ensure it's treated as a tuple
        searchParams={searchParams}
        onFilterChange={onPriceFilterChange}
      />
    </div>
  );
}
