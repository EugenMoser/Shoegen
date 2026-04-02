import { useSession } from "next-auth/react";

import { logout } from "@/modules/auth/actions/logout";

export async function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session?.user ? (
        <form
          action={logout}
          className="flex gap-6 mb-4"
        >
          <p>Willkommen</p>
          <button
            type="submit"
            className="cursor-pointer"
          >
            Logout
          </button>
        </form>
      ) : (
        <a
          href="/login"
          className="cursor-pointer"
        >
          Login
        </a>
      )}
    </nav>
  );
}
