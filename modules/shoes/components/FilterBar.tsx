"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
  SEASONS,
  Shoe,
  SHOE_CATEGORIES,
  ShoeCategory,
  Terrain,
  TERRAINS,
} from "@/modules/shoes/types";

import FilterDropdown from "./FilterDropdown";

interface FilterBarProps {
  shoes?: Shoe[];
}

export default function FilterBar({
  shoes,
}: FilterBarProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const [filterCounter, setFilterCounter] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const count = Array.from(searchParams.entries()).reduce(
      (acc, [key, value]) => {
        if (key === "searchQuery") {
          return acc;
        }
        return acc + value.split(",").filter(Boolean).length; // Count each selected option in multi-select filters
      },
      0,
    );
    setFilterCounter(count);
  }, [searchParams]);

  const getParamCount = (paramName: string) =>
    searchParams.get(paramName)?.split(",").filter(Boolean).length ?? 0;

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
        paramName="brands "
        options={extractUniqueBrands(shoes)}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
        getParamCount={getParamCount}
      />
      <FilterDropdown
        label="Kategorien"
        paramName="categories"
        options={SHOE_CATEGORIES}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
        getParamCount={getParamCount}
      />
      <FilterDropdown
        label="Terrains"
        paramName="terrains"
        options={TERRAINS}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
        getParamCount={getParamCount}
      />
      <FilterDropdown
        label="Sessions"
        paramName="sessions"
        options={SEASONS}
        searchParams={searchParams}
        onFilterChange={onMultiFilterChange}
        getParamCount={getParamCount}
      />
    </div>
  );
}
