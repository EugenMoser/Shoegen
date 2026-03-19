"use client";
import { useState } from "react";

import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Shoe, ShoeCategory } from "@/modules/shoes/types";

interface ShoeFilterProps {
  shoes?: Shoe[];
}

export default function ShoeFilter({
  shoes,
}: ShoeFilterProps): React.JSX.Element {
  const searchParams = useSearchParams();

  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onClickHandler = () => {
    setOpen(!open);
  };

  const onCategoryChangeHandler = (category: ShoeCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentParams =
      params.get("category")?.split(",").filter(Boolean) ?? [];

    // Toggle category in the current parameters
    const updated = currentParams.includes(category)
      ? currentParams.filter((c) => c !== category)
      : [...currentParams, category];

    // Update the URL parameters based on the updated category list
    if (updated.length === 0) {
      params.delete("category");
    } else {
      params.set("category", updated.join(","));
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
      {open && (
        <>
          <div className="fixed inset-0 bg-gray-500 opacity-75 p-4 min-w-full min-h-full z-20"></div>
          <div className="fixed top-0 right-0 bottom-0 bg-white border rounded shadow p-4 w-72 h-full z-30">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={onClickHandler}
            />
            <h3 className="text-lg font-semibold mb-4">Filter</h3>
            <FieldSet>
              <FieldLegend variant="label">Kategorien</FieldLegend>
              <FieldGroup className="max-w-sm">
                {shoes &&
                  [...new Set(shoes.flatMap((shoe) => shoe.category))].map(
                    (category: ShoeCategory) => (
                      <Field
                        key={category}
                        orientation="horizontal"
                      >
                        <Checkbox
                          id={`category-${category}-checkbox`}
                          name={`category-${category}-checkbox`}
                          onCheckedChange={() => {
                            onCategoryChangeHandler(category);
                          }}
                          checked={
                            searchParams
                              .get("category")
                              ?.split(",")
                              .includes(category) ?? false
                          }
                        />
                        <FieldLabel
                          htmlFor={`category-${category}-checkbox`}
                        >
                          {category}
                        </FieldLabel>
                      </Field>
                    ),
                  )}
              </FieldGroup>
            </FieldSet>
          </div>
        </>
      )}
    </>
  );
}
