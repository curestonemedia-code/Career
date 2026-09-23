import { FilesIcon, GaugeIcon, SignOutIcon, SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/admin/actions/auth";
import { verifySession } from "@/lib/auth/dal";
import { siteConfig } from "@/lib/site-config";

// A route group (parentheses don't affect the URL) so /admin/login sits
// outside this authenticated shell entirely, avoiding a redirect loop
// between this layout's verifySession() and the login page it redirects to.
const navLinks = [
  { href: "/admin", label: "Dashboard", Icon: GaugeIcon },
  { href: "/admin/applications", label: "Applications", Icon: FilesIcon },
  { href: "/admin/jobs", label: "Jobs", Icon: SquaresFourIcon },
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await verifySession();

  return (
    <div className="min-h-screen bg-surface">
      <nav className="sticky top-0 z-50 border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-[1300px] items-center gap-8 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src={siteConfig.logo} alt={siteConfig.name} width={110} height={30} className="h-7 w-auto" />
            <span className="text-xs font-black tracking-widest text-ink-3 uppercase">Admin</span>
          </Link>
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-ink-2 transition-colors hover:bg-surface hover:text-ink"
                >
                  <link.Icon size={16} weight="bold" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <form action={logout} className="ml-auto">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-ink-2 transition-colors hover:bg-surface hover:text-ink"
            >
              <SignOutIcon size={16} weight="bold" />
              Logout
            </button>
          </form>
        </div>
      </nav>
      <main className="mx-auto max-w-[1300px] px-6 py-10">{children}</main>
    </div>
  );
}
