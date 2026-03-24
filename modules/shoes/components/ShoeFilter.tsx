"use client";
import { useEffect, useState } from "react";

import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  SEASONS,
  Shoe,
  SHOE_CATEGORIES,
  ShoeCategory,
  Terrain,
  TERRAINS,
} from "@/modules/shoes/types";

import CheckboxFilterGroup from "./CheckboxFilterGroup";

interface ShoeFilterProps {
  shoes?: Shoe[];
}

export default function ShoeFilter({
  shoes,
}: ShoeFilterProps): React.JSX.Element {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [filterCounter, setFilterCounter] = useState(0);

  const onClickHandler = () => {
    setOpen(!open);
  };

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

  const onMultiFilterChange = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentParams =
      params.get(paramName)?.split(",").filter(Boolean) ?? [];

    // Toggle value in the current parameters
    const updated = currentParams.includes(value)
      ? currentParams.filter((currentParam) => currentParam !== value)
      : [...currentParams, value];

    // Update the URL parameters based on the updated list
    if (updated.length === 0) {
      params.delete(paramName);
    } else {
      params.set(paramName, updated.join(","));
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      <SlidersHorizontal
        name="sliders-horizontal"
        size={24}
        onClick={onClickHandler}
        className="cursor-pointer"
      />

      <Badge
        variant="default"
        className="w-4 h-4 p-0"
      >
        {filterCounter}
      </Badge>
      {open && (
        <>
          <div className="fixed inset-0 bg-gray-500 opacity-75 p-4 min-w-full min-h-full z-20"></div>
          <div className=" top-0 right-0 bottom-0 bg-white border rounded shadow p-4 w-72 h-full z-30">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={onClickHandler}
            />
            <h3 className="text-lg font-semibold mb-4">Filter</h3>
            <FieldSet>
              <CheckboxFilterGroup
                label="Kategorien"
                paramName="categories"
                options={SHOE_CATEGORIES}
                searchParams={searchParams}
                onFilterChange={onMultiFilterChange}
                getParamCount={getParamCount}
              />
              <CheckboxFilterGroup
                label="Terrains"
                paramName="terrains"
                options={TERRAINS}
                searchParams={searchParams}
                onFilterChange={onMultiFilterChange}
                getParamCount={getParamCount}
              />
              <CheckboxFilterGroup
                label="Saisons"
                paramName="seasons"
                options={SEASONS}
                searchParams={searchParams}
                onFilterChange={onMultiFilterChange}
                getParamCount={getParamCount}
              />
              {/*   <CheckboxFilterGroup
                label="Wasserdicht"
                paramName="waterproof"
                options={["true", "false"]}
                searchParams={searchParams}
                onFilterChange={onMultiFilterChange}
                getParamCount={getParamCount}
              /> */}
            </FieldSet>
          </div>
        </>
      )}
    </>
  );
}
