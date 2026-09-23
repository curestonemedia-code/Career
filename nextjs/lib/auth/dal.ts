import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt, SESSION_COOKIE, type SessionPayload } from "@/lib/auth/session";

/**
 * The real, secure session check — verifies the JWT signature. Wrapped in
 * React's cache() so multiple calls during one render pass only decrypt
 * once. proxy.ts does a lighter version of this for fast redirects; this
 * is the check that actually gates data access.
 */
export const verifySession = cache(async (): Promise<SessionPayload> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await decrypt(token);

  if (!session) {
    redirect("/admin/login");
  }

  return session;
});
