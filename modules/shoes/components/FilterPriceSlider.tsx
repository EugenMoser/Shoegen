"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface FilterPriceSliderProps {
  label: string;
  minParamName: string;
  maxParamName: string;
  options: readonly number[]; // e.g. [minPrice, maxPrice]
  searchParams: URLSearchParams;
  onFilterChange: (minPrice: string, maxPrice: string) => void;
}

export default function FilterPriceSlider({
  label,
  minParamName,
  maxParamName,
  options,
  searchParams,
  onFilterChange,
}: FilterPriceSliderProps): React.JSX.Element {
  const [localValues, setLocalValues] = useState<number[]>([
    searchParams.get(minParamName)
      ? Number(searchParams.get(minParamName))
      : options[0],
    searchParams.get(maxParamName)
      ? Number(searchParams.get(maxParamName))
      : options[1],
  ]);

  const onSliderChange = (newValue: number[]) => {
    setLocalValues(newValue);
  };

  const onSliderCommit = (newValue: number[]) => {
    onFilterChange(newValue[0].toString(), newValue[1].toString());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{label}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col items-center w-full gap-4">
          <FieldGroup className="flex flex-row items-center justify-between w-full">
            <Field>
              <FieldLabel htmlFor="min-price">ab</FieldLabel>
              <Input
                id="min-price"
                className="text-sm text-muted-foreground "
                value={localValues[0]}
                onChange={(event) =>
                  onSliderChange([
                    Number(event.target.value),
                    localValues[1],
                  ])
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="max-price">bis</FieldLabel>
              <Input
                id="max-price"
                className="text-sm text-muted-foreground "
                value={localValues[1]}
                onChange={(event) =>
                  onSliderChange([
                    localValues[0],
                    Number(event.target.value),
                  ])
                }
              />
            </Field>
          </FieldGroup>
          <Slider
            id="slider-price"
            onValueChange={onSliderChange}
            onValueCommit={onSliderCommit}
            value={localValues} // Use localValues directly for the slider
            min={options[0]}
            max={options[1]}
            step={5}
            className=" w-full max-w-xs"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
