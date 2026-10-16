import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/ApplyForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getPublishedRoles, getRoleBySlug } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

// Each role gets its own dedicated apply page rather than a shared /apply
// picker, mirroring /careers/[slug]'s ISR setup so a brand new role is
// reachable immediately without a redeploy.
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const roles = await getPublishedRoles();
    return roles.map((role) => ({ slug: role.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: PageProps<"/apply/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const role = await getRoleBySlug(slug);
  if (!role || role.status !== "published") return {};

  const description = `Apply for the ${role.title} role at ${siteConfig.legalName} in Gurugram. Takes about 5 minutes.`;

  return {
    title: `Apply — ${role.title}`,
    description,
    alternates: {
      canonical: `/apply/${role.slug}`,
    },
    openGraph: {
      title: `Apply — ${role.title} at Cure Stone`,
      description,
      url: `${siteConfig.url}/apply/${role.slug}`,
    },
  };
}

export default async function ApplyToRolePage(props: PageProps<"/apply/[slug]">) {
  const { slug } = await props.params;
  const role = await getRoleBySlug(slug);
  if (!role || role.status !== "published") notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: role.title, url: `${siteConfig.url}/careers/${role.slug}` },
    { name: "Apply", url: `${siteConfig.url}/apply/${role.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-surface px-6 py-12 pb-24">
      <JsonLd data={breadcrumbs} />
      <div className="mx-auto max-w-[1160px]">
        <Link
          href={`/careers/${role.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-2 transition-colors hover:text-blue"
        >
          <ArrowLeftIcon size={14} weight="bold" />
          Back to {role.title}
        </Link>

        <div className="mt-4 mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-7">
          <div>
            <h1 className="text-[32px] leading-tight font-black tracking-tight text-ink sm:text-[38px]">
              Apply for {role.title}
            </h1>
            <p className="mt-1.5 text-[15px] text-ink-2">
              {siteConfig.legalName} · Gurugram · Takes about 5 minutes
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1.5 text-[11px] font-black tracking-widest text-[#15803d] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            Now hiring
          </span>
        </div>

        <ApplyForm role={role} />
      </div>
    </div>
  );
}
