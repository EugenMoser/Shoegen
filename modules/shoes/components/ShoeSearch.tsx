"use client";

import { useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "../../../components/ui/input";

export default function ShoeSearch(): React.JSX.Element {
  const searchParams = useSearchParams();
  const searchQueryParams = searchParams.get("query");

  const router = useRouter();
  const [inputValue, setInputValue] = useState(searchQueryParams ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  ); // Ref to store the timeout ID for debouncing

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setInputValue(query);
    clearTimeout(timeoutRef.current); // Clear the previous timeout if it exists
    const params = new URLSearchParams(searchParams.toString());

    // Debounce navigation by 300ms
    timeoutRef.current = setTimeout(() => {
      if (query === "") {
        // If the query is cleared, navigate back to the shop page without query parameters
        params.delete("query");
      } else if (query !== searchQueryParams) {
        params.set("query", encodeURIComponent(query));
      }
      router.replace(`?${params.toString()}`);
    }, 300);
  };

  return (
    <div className="flex flex-col w-[50%]">
      <h3>Suche</h3>
      <Input
        type="text"
        placeholder="Suche nach Schuhen..."
        className=""
        onChange={onChangeHandler}
        value={inputValue}
      />
    </div>
  );
}
