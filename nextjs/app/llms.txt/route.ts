import { formatSalary, getPublishedRoles } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

// The llms.txt convention (https://llmstxt.org) — a plain-text summary for
// AI assistants and crawlers, kept accurate automatically since it reads
// the same role data as the rest of the site instead of hardcoding roles
// that go stale the moment one closes or a new one opens.
export const revalidate = 300;

export async function GET() {
  const roles = await getPublishedRoles().catch(() => []);

  const roleLines = roles.length
    ? roles
        .map(
          (role) =>
            `- [${role.title}](${siteConfig.url}/careers/${role.slug}): ${role.tagline} ${
              role.salaryDisclosed ? `${formatSalary(role)}/month.` : "Compensation discussed personally."
            } Apply at ${siteConfig.url}/apply/${role.slug}`,
        )
        .join("\n")
    : "- No roles are open right now. Check back soon.";

  const body = `# ${siteConfig.name} Careers

> ${siteConfig.shortDescription}

${siteConfig.name} is a healthcare media and clinical brand in Gurugram, India, founded by ${siteConfig.founder.name} (${siteConfig.founder.title}). This site lists open roles and lets candidates apply directly online.

## Open roles

${roleLines}

## Key facts

- Location: ${siteConfig.addressLines.street}, ${siteConfig.addressLines.locality}, ${siteConfig.addressLines.region} ${siteConfig.addressLines.postalCode}, ${siteConfig.addressLines.country}
- Contact: ${siteConfig.email}
- Clinical track record: ${siteConfig.stats.surgeries} surgeries performed, ${siteConfig.stats.patientsTreated} patients treated, ${siteConfig.stats.successRate} success rate, ${siteConfig.stats.yearsExperience} experience

## Pages

- Homepage and current openings: ${siteConfig.url}/
- Full list of pages: ${siteConfig.url}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
