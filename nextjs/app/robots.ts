import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// /admin and /api are disallowed (the admin panel is also noindex'd at the
// page level — see app/admin/layout.tsx — this is defense in depth plus
// keeps crawl budget off routes with nothing worth indexing). Every bot
// relevant to traditional search and AI/GEO search is allowed explicitly:
// generic search crawlers, AI assistants that browse on a user's behalf,
// and AI training/citation crawlers.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Google, Bing
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
      // AI search / assistants
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Perplexity-User", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-User", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
