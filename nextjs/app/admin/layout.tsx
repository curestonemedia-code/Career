import type { Metadata } from "next";

// Applies to the whole /admin tree, including the (unprotected) login page.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
