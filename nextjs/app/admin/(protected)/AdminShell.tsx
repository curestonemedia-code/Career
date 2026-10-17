"use client";

import { FilesIcon, GaugeIcon, ListIcon, SignOutIcon, SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { logout } from "@/app/admin/actions/auth";
import { siteConfig } from "@/lib/site-config";
import styles from "./admin-shell.module.css";

// Visual port of the Cure Stone CRM's sidebar + topbar shell (see
// admin-shell.module.css for provenance). CRM-only features (global search,
// notifications, theme toggle, change password) are left out since this app
// doesn't have them — a faked button for a feature that doesn't exist would
// be worse than no button.

const navGroups = [
  {
    label: "Menu",
    items: [
      { href: "/admin", label: "Dashboard", Icon: GaugeIcon },
      { href: "/admin/applications", label: "Applications", Icon: FilesIcon },
      { href: "/admin/jobs", label: "Jobs", Icon: SquaresFourIcon },
    ],
  },
];

const EXACT_ONLY = new Set(["/admin"]);

function isActive(pathname: string, href: string): boolean {
  if (EXACT_ONLY.has(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getPageTitle(pathname: string): string {
  if (pathname.startsWith("/admin/applications")) return "Applications";
  if (pathname.startsWith("/admin/jobs")) return "Jobs";
  if (pathname === "/admin") return "Dashboard";
  return "Admin";
}

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const initial = (email[0] ?? "A").toUpperCase();

  return (
    <>
      <div
        className={`${styles["sidebar-overlay"]}${sidebarOpen ? ` ${styles.show}` : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <div className={styles["app-shell"]}>
        <aside className={`${styles.sidebar}${sidebarOpen ? ` ${styles.open}` : ""}`}>
          <div className={styles["sidebar-brand"]}>
            <Link href="/admin" style={{ display: "block", lineHeight: 0 }}>
              <Image src={siteConfig.logo} alt={siteConfig.name} width={110} height={30} className="h-7 w-auto object-contain object-left" />
            </Link>
          </div>
          <nav className={styles["sidebar-nav"]}>
            {navGroups.map((group) => (
              <div className={styles["nav-group"]} key={group.label}>
                <span className={styles["nav-label"]}>{group.label}</span>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`${styles["nav-item"]}${isActive(pathname, item.href) ? ` ${styles.active}` : ""}`}
                  >
                    <span className={styles["nav-icon"]}>
                      <item.Icon size={17} weight="bold" />
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <div className={styles["main-content"]}>
          <header className={styles.topbar}>
            <div className={styles["topbar-left"]}>
              <button type="button" className={styles.hamburger} onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle menu">
                <ListIcon size={18} weight="bold" />
              </button>
              <h1 className={styles["page-title"]}>{getPageTitle(pathname)}</h1>
            </div>
            <div className={styles["topbar-right"]}>
              <div className={styles["profile-dd-wrap"]} ref={ddRef}>
                <button type="button" className={styles["profile-dd-trigger"]} title={email} onClick={() => setDdOpen((v) => !v)}>
                  {initial}
                </button>
                <div className={`${styles["profile-dd"]}${ddOpen ? ` ${styles.open}` : ""}`}>
                  <div className={styles["profile-dd-head"]}>
                    <div className={styles["profile-dd-avatar-lg"]}>{initial}</div>
                    <div className={styles["profile-dd-info"]}>
                      <span className={styles["profile-dd-name"]}>Admin</span>
                      <span className={styles["profile-dd-email"]}>{email}</span>
                    </div>
                  </div>
                  <div className={styles["profile-dd-divider"]} />
                  <form action={logout}>
                    <button type="submit" className={`${styles["profile-dd-item"]} ${styles["profile-dd-signout"]}`}>
                      <SignOutIcon size={16} weight="bold" />
                      Sign Out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </header>

          <main className={styles["page-body"]}>{children}</main>
        </div>
      </div>
    </>
  );
}
