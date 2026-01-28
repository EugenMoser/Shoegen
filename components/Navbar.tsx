import { logout } from '@/actions/logout';
import { auth } from '@/auth';

export async function Navbar() {
  const session = await auth();

  return (
    <nav>
      {session?.user ? (
        <form
          action={logout}
          className="flex gap-6 mb-4"
        >
          <p>Willkommen</p>
          <button type="submit">Logout</button>
        </form>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
}
