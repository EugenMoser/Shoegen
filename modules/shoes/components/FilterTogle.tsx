import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FilterToggleProps {
  label: string;
  paramName: string;
  searchParams: URLSearchParams;
  onFilterChange: (paramName: string, value: boolean) => void;
}

export default function FilterToggle({
  label,
  paramName,
  searchParams,
  onFilterChange,
}: FilterToggleProps): React.JSX.Element {
  // Get the current value of the toggle from search parameters, default to false if not set
  const itemParamValue = searchParams.get(paramName) === "true";
  const onChangeHandler = () => {
    const newValue = !itemParamValue;

    onFilterChange(paramName, newValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={paramName}
        checked={itemParamValue}
        onCheckedChange={onChangeHandler}
      />
      <Label htmlFor={paramName}>{label}</Label>
    </div>
  );
}
