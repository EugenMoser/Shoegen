import { auth } from '@/auth';
import {
  hasPermission,
  permissions,
} from '@/modules/auth/permissions';

export default async function Dashboard() {
  const session = await auth();
  const role = session!.user.role;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <p className="text-sm text-muted-foreground">
        Du bist angemeldet als <strong>{session?.user.email}</strong> (
        {session?.user.role})
      </p>

      <ul className="flex flex-col  md:justify-between md:flex-row gap-4 m-6">
        <li className="flex flex-col border p-4 rounded-lg items-start">
          <h2 className="mb-4 font-medium">Produkte</h2>
          {hasPermission(role, permissions.product.create) && (
            <button className="text-sm underline">Produkt anlegen</button>
          )}
          {hasPermission(role, permissions.product.update) && (
            <button className="text-sm underline">
              Produkte bearbeiten
            </button>
          )}
        </li>
        <li className="flex flex-col border p-4 rounded-lg items-start">
          <h2 className="font-medium mb-4 ">Bestellungen</h2>
          {hasPermission(role, permissions.order.read) && (
            <button className="text-sm underline">
              Bestellungen ansehen
            </button>
          )}
        </li>
        <li className="flex flex-col border p-4 rounded-lg items-start">
          <h2 className="mb-4 font-medium">Benutzer</h2>
          {hasPermission(role, permissions.user.manage) && (
            <button className="text-sm underline">
              Benutzer verwalten
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
