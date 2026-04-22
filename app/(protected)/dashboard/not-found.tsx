import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h2>Seite nicht gefunden</h2>
      <p>Die angeforderte Ressource konnte nicht gefunden werden</p>
      <Link href="/dashboard">Zurück zum Dashboard</Link>
    </>
  );
}
