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
    default: "Join Cure Stone: 3 Roles Open in Gurugram",
    template: `%s | ${siteConfig.name} Careers`,
  },
  description:
    "Cure Stone is hiring a Video Editor, SEO Intern, and Camera Operator in Gurugram to create content that educates millions on kidney health. Apply today.",
  keywords: [
    "video editor jobs Gurugram",
    "SEO intern jobs Gurugram",
    "camera operator jobs Gurugram",
    "Cure Stone careers",
    "healthcare content jobs India",
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
    title: "Join Cure Stone: 3 Roles Open in Gurugram",
    description:
      "We're hiring a Video Editor, SEO Intern, and Camera Operator in Gurugram to bring our medical stories to life for an audience of millions.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Join Cure Stone: 3 Roles Open in Gurugram",
    description:
      "We're hiring a Video Editor, SEO Intern, and Camera Operator in Gurugram to bring our medical stories to life for an audience of millions.",
    images: ["/logo.png"],
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
    icon: "/favicon.ico",
  },
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
