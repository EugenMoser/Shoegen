import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import { authConfig } from '@/auth.config';

// Middleware to add the current path to the request headers
export function middleware(request: Request) {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);
  headers.set("x-current-path", url.pathname);

  return NextResponse.next({ headers });
}

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
