import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { ApplyForm } from "@/components/ApplyForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getPublishedRoles, getRoleBySlug } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to an open role at Cure Stone in Gurugram: Video Editor, SEO Intern, or Camera Operator. It takes about 5 minutes.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply to Cure Stone",
    description:
      "Apply to an open role at Cure Stone in Gurugram: Video Editor, SEO Intern, or Camera Operator.",
    url: `${siteConfig.url}/apply`,
  },
};

export default async function ApplyPage(props: PageProps<"/apply">) {
  const searchParams = await props.searchParams;
  const roleParam = typeof searchParams.role === "string" ? searchParams.role : undefined;
  const [roles, preselected] = await Promise.all([
    getPublishedRoles(),
    roleParam ? getRoleBySlug(roleParam) : Promise.resolve(undefined),
  ]);

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Apply", url: `${siteConfig.url}/apply` },
  ]);

  return (
    <div className="min-h-screen bg-surface px-6 py-12 pb-24">
      <JsonLd data={breadcrumbs} />
      <div className="mx-auto max-w-[1160px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-2 transition-colors hover:text-blue"
        >
          <ArrowLeftIcon size={14} weight="bold" />
          Back to Cure Stone Careers
        </Link>

        <div className="mt-4 mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-7">
          <div>
            <h1 className="text-[32px] leading-tight font-black tracking-tight text-ink sm:text-[38px]">
              Apply to Cure Stone
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

        <ApplyForm roles={roles} initialRoleSlug={preselected?.slug} />
      </div>
    </div>
  );
}
