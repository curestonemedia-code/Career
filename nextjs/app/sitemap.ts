import type { MetadataRoute } from "next";
import { getPublishedRoles } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const roles = await getPublishedRoles().catch(() => []);

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...roles.map((role) => ({
      url: `${siteConfig.url}/careers/${role.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...roles.map((role) => ({
      url: `${siteConfig.url}/apply/${role.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
