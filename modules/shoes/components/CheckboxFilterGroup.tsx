import { Checkbox } from "@/components/ui/checkbox";
import {
  F,
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "@/components/ui/field";

interface CheckboxFilterGroupProps {
  label: string;
  paramName: string;
  options: readonly string[]; // e.g. SHOE_CATEGORIES / TERRAINS
  searchParams: URLSearchParams;
  onFilterChange: (paramName: string, value: string) => void;
  getParamCount: (paramName: string) => number;
}

export default function CheckboxFilterGroup({
  label,
  paramName,
  options,
  searchParams,
  onFilterChange,
  getParamCount,
}: CheckboxFilterGroupProps): React.JSX.Element {
  return (
    <>
      <FieldLegend variant="legend">
        {label}{" "}
        {getParamCount(paramName) > 0 && `(${getParamCount(paramName)})`}
      </FieldLegend>
      <FieldGroup className="max-w-sm mb-4">
        {options.map((option) => (
          <Field
            key={option}
            orientation="horizontal"
          >
            <Checkbox
              id={`${paramName}-${option}-checkbox`}
              name={`${paramName}-${option}-checkbox`}
              onCheckedChange={() => {
                onFilterChange(paramName, option);
              }}
              checked={
                searchParams.get(paramName)?.split(",").includes(option) ??
                false
              }
            />
            <FieldLabel htmlFor={`${paramName}-${option}-checkbox`}>
              {option}
            </FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </>
  );
}
