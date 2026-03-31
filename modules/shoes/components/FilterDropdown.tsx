import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterDropdownProps {
  label: string;
  paramName: string;
  options: readonly string[]; // e.g. SHOE_CATEGORIES / TERRAINS
  searchParams: URLSearchParams;
  onFilterChange: (paramName: string, value: string[]) => void;
}

export default function FilterDropdown({
  label,
  paramName,
  options,
  searchParams,
  onFilterChange,
}: FilterDropdownProps): React.JSX.Element {
  const itemParamValue = searchParams.get(paramName)?.split(",") ?? [];

  const numberOfSelectedOptions =
    itemParamValue.length > 0 ? itemParamValue.length : "";

  const handleCheckboxChange = (option: string) => {
    const newValue = itemParamValue.includes(option)
      ? itemParamValue.filter((value) => value !== option)
      : [...itemParamValue, option];
    onFilterChange(paramName, newValue);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {label}{" "}
          {numberOfSelectedOptions && (
            <Badge
              variant="default"
              className="w-4.5 h-4.5 p-0 text-[10px]"
            >
              {numberOfSelectedOptions}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          {options.map((option) => (
            <Field
              key={option}
              orientation="horizontal"
            >
              <Checkbox
                id={`${paramName}-${option}-checkbox`}
                name={`${paramName}-${option}-checkbox`}
                onCheckedChange={() => {
                  handleCheckboxChange(option);
                }}
                checked={itemParamValue.includes(option)}
              />
              <Label htmlFor={`${paramName}-${option}-checkbox`}>
                {option}
              </Label>
            </Field>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
