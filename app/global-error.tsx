"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Etwas ist schiefgelaufen!</h2>
        <button onClick={() => reset()}>Erneut versuchen</button>
      </body>
    </html>
  );
}
