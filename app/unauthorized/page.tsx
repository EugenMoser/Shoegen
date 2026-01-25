export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Zugriff verweigert</h1>
      <p className="text-muted-foreground">
        Du hast keine Berechtigung, diese Seite zu sehen.
      </p>
      <a
        href="/"
        className="text-blue-600 underline"
      >
        Zurück zur Startseite
      </a>
    </main>
  );
}
