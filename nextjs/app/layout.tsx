import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Join Cure Stone: Open Roles in Gurugram",
    template: `%s | ${siteConfig.name} Careers`,
  },
  description:
    "Cure Stone is hiring an SEO Intern and a Urologist in Gurugram to help more patients find and receive reliable kidney health care. Apply today.",
  keywords: [
    "SEO intern jobs Gurugram",
    "urologist jobs Gurugram",
    "Cure Stone careers",
    "healthcare jobs India",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Careers`,
    title: "Join Cure Stone: Open Roles in Gurugram",
    description:
      "We're hiring an SEO Intern and a Urologist in Gurugram to bring reliable kidney health care and content to more patients.",
    // og:image / twitter:image come from app/opengraph-image.tsx and
    // app/twitter-image.tsx (generated at build time), not set here.
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Cure Stone: Open Roles in Gurugram",
    description:
      "We're hiring an SEO Intern and a Urologist in Gurugram to bring reliable kidney health care and content to more patients.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${poppins.variable} antialiased`}>
      <body className="min-h-screen bg-white text-ink">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
