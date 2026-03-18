"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ShoeAttributeSelectProps {
  name: string;
  label: string;
  options: readonly string[];
  defaultValue?: string;
  placeholder?: string;
}

export function ShoeAttributeSelect({
  name,
  label,
  options,
  defaultValue,
  placeholder,
}: ShoeAttributeSelectProps) {
  return (
    <Select
      name={name}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder ?? `${label} auswählen`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
