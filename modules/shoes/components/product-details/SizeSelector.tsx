import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { ShoeSize } from "../../types";

interface SizeSelectorProps {
  sizeOptions: { size: string; stock: number }[];
}

const displayStock = (stock: number): string => {
  if (stock >= 10) {
    return "";
  } else if (stock > 0) {
    return `nur noch ${stock} auf Lager`;
  } else {
    return "nicht verfügbar";
  }
};

export default function SizeSelector({
  sizeOptions,
}: SizeSelectorProps): React.JSX.Element {
  return (
    <>
      <Select>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Größe auswählen" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Größenauswahl</SelectLabel>

            {sizeOptions.map((size, index) => (
              <SelectItem
                key={index}
                value={size.size.toString()}
                disabled={size.stock === 0}
                className={cn({
                  "text-red-500 ": size.stock === 10,
                })}
              >
                {`${size.size}`}{" "}
                <span className="text-xs">{displayStock(size.stock)}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
