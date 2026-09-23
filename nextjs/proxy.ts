import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/lib/auth/session";

// Optimistic auth check for the admin area: verifies the session cookie
// (cheap, no DB call) and redirects accordingly. This is not the last line
// of defense — lib/auth/dal.ts's verifySession() does the real check close
// to the data in every admin page/action. Next.js 16 renamed middleware.ts
// to proxy.ts; the capabilities are otherwise the same.
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await decrypt(token);

  const isLoginPage = pathname === "/admin/login";

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
