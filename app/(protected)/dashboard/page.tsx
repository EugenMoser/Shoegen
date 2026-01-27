import { auth } from '@/auth';

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <p className="text-sm text-muted-foreground">
        Hallo <strong>{session?.user.email}</strong> ({session?.user.role})
      </p>

      <ul className="flex flex-col  md:justify-between md:flex-row gap-4 m-6">
        <li className="md:min-w-50 flex justify-center rounded border p-4">
          Produkte
        </li>
        <li className="md:min-w-50 flex justify-center rounded border p-4">
          Bestellungen
        </li>
        <li className="md:min-w-50 flex justify-center rounded border p-4">
          Benutzer
        </li>
      </ul>
    </div>
  );
}
