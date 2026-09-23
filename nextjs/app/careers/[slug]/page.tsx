import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { RoleDetail } from "@/components/RoleDetail";
import { breadcrumbSchema, jobPostingSchema } from "@/lib/schema";
import { formatSalary, getPublishedRoles, getRoleBySlug } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

// Roles are admin-editable, so this page is ISR rather than fully static:
// existing pages are revalidated periodically, and any slug not in the
// pre-rendered set (a brand new role, or one closed/reopened after the last
// build) is still rendered on demand instead of 404ing.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const roles = await getPublishedRoles();
    return roles.map((role) => ({ slug: role.slug }));
  } catch {
    // DB unreachable at build time (e.g. offline/CI build) — degrade to
    // fully on-demand rendering for every slug instead of failing the build.
    return [];
  }
}

export async function generateMetadata(props: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const role = await getRoleBySlug(slug);
  if (!role || role.status === "draft") return {};

  const title = `${role.title} (${formatSalary(role)}/mo)`;
  const description = `${role.tagline} ${role.employmentLabel}, on-site in Gurugram. Apply to the ${role.title} role at Cure Stone.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/careers/${role.slug}`,
    },
    openGraph: {
      title: `${role.title} at Cure Stone`,
      description,
      url: `${siteConfig.url}/careers/${role.slug}`,
    },
  };
}

export default async function CareerDetailPage(props: PageProps<"/careers/[slug]">) {
  const { slug } = await props.params;
  const role = await getRoleBySlug(slug);
  if (!role || role.status === "draft") notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Open Positions", url: `${siteConfig.url}/#positions` },
    { name: role.title, url: `${siteConfig.url}/careers/${role.slug}` },
  ]);

  return (
    <>
      {role.status === "published" && <JsonLd data={[jobPostingSchema(role), breadcrumbs]} />}
      <Nav />
      <RoleDetail role={role} />
      <Footer />
    </>
  );
}
