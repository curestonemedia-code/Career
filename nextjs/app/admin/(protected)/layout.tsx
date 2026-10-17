import { verifySession } from "@/lib/auth/dal";
import { AdminShell } from "./AdminShell";

// A route group (parentheses don't affect the URL) so /admin/login sits
// outside this authenticated shell entirely, avoiding a redirect loop
// between this layout's verifySession() and the login page it redirects to.
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
