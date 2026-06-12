import { NextResponse, type NextRequest } from 'next/server';

/** Routes that require an authenticated Firebase session cookie. */
const PROTECTED_PATHS = ['/account', '/order-tracking'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!isProtected) return NextResponse.next();

  /**
   * Firebase Auth with the JS SDK is client-side only and does NOT set a
   * cookie by default.  The recommended production pattern is:
   *   1. On sign-in, call getIdToken() and POST it to an API route that sets
   *      an HttpOnly session cookie via firebase-admin.
   *   2. Read that cookie here in the Edge middleware.
   *
   * For now we read a lightweight "__fb_session" cookie that the sign-in flow
   * sets as a signal.  This keeps the middleware dependency-free (no Admin SDK
   * on the edge) while still redirecting unauthenticated users.
   *
   * Replace the cookie name / logic with your Admin SDK verification once
   * firebase-admin is integrated server-side.
   */
  const sessionCookie = request.cookies.get('__fb_session');

  if (!sessionCookie?.value) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/order-tracking/:path*'],
};
