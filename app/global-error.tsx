"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <h2>Ein Fehler ist aufgetreten.</h2>
        <button onClick={() => reset()}>Erneut versuchen</button>
      </body>
    </html>
  );
}
