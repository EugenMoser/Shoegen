"use client";

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div>
      <h2>Ein Fehler ist aufgetreten.</h2>
      <button onClick={() => reset()}>Erneut versuchen</button>
    </div>
  );
}
