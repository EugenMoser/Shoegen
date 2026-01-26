import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Zugriff verweigert</h1>

      <p className="text-muted-foreground text-center max-w-md">
        Du bist angemeldet, hast aber keine Berechtigung, diese Seite
        aufzurufen.
      </p>

      <div className="flex gap-2">
        <Link
          href="/"
          className="rounded-md border px-4 py-2  "
        >
          Zur Startseite
        </Link>

        <Link
          href="/dashboard"
          className="rounded-md border px-4 py-2 "
        >
          Zum Dashboard
        </Link>
      </div>
    </main>
  );
}
