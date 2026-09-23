import { ArrowLeftIcon, DownloadSimpleIcon, LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db/connect";
import { ApplicationModel } from "@/lib/db/models/Application";
import { StatusForm } from "./StatusForm";

export const metadata = { title: "Application | Admin" };

function Field({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div>
      <p className="text-[11px] font-bold tracking-wide text-ink-3 uppercase">{label}</p>
      <p className="mt-0.5 text-sm text-ink">{value}</p>
    </div>
  );
}

function ToolList({ label, tools }: { label: string; tools: { name: string; proficiency: string }[] }) {
  if (!tools || tools.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] font-bold tracking-wide text-ink-3 uppercase">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {tools.map((t) => (
          <span key={t.name} className="rounded-full bg-blue-light px-2.5 py-1 text-xs font-semibold text-blue">
            {t.name} ({t.proficiency})
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const app = await ApplicationModel.findById(id).lean().catch(() => null);
  if (!app) notFound();

  const resume = app.resume;
  const resumeUrl = `/admin/applications/${id}/resume`;

  return (
    <div>
      <Link href="/admin/applications" className="flex items-center gap-1.5 text-sm font-bold text-ink-2 hover:text-blue">
        <ArrowLeftIcon size={14} weight="bold" />
        All applications
      </Link>

      <div className="mt-4 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink">{app.applicant?.name}</h1>
          <p className="mt-1 text-sm text-ink-2">
            Applied for {app.roleTitle}
            {app.createdAt ? ` · ${new Date(app.createdAt).toLocaleString("en-IN")}` : ""}
          </p>
        </div>
      </div>

      {app.flags && app.flags.length > 0 && (
        <div className="mb-6 rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-4 text-sm font-semibold text-[#92400e]">
          Flags: {app.flags.join(", ")}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-4 text-[11px] font-black tracking-widest text-ink-3 uppercase">Personal &amp; compensation</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <Field label="Phone" value={app.applicant?.phone} />
              <Field label="Email" value={app.applicant?.email} />
              <Field label="City" value={app.applicant?.city} />
              <Field label="Current salary" value={app.compensation?.currentSalary ? `₹${app.compensation.currentSalary}/mo` : null} />
              <Field label="Expected salary" value={app.compensation?.expectedSalary ? `₹${app.compensation.expectedSalary}/mo` : null} />
              <Field label="Notice period" value={app.compensation?.noticePeriod} />
              <Field label="Work mode" value={app.compensation?.workMode} />
              <Field label="Experience" value={app.experience?.yearsOfExperience} />
              <Field label="Employment type sought" value={app.experience?.employmentTypeSought} />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-4 text-[11px] font-black tracking-widest text-ink-3 uppercase">Resume</p>
            {resume?.source === "upload" && resume.blobUrl ? (
              <div>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-light px-4 py-2.5 text-sm font-bold text-blue"
                >
                  <DownloadSimpleIcon size={16} weight="bold" />
                  {resume.fileName ?? "View resume"}
                </a>
                {resume.mimeType === "application/pdf" ? (
                  <iframe
                    src={resumeUrl}
                    title="Resume preview"
                    className="mt-3 h-[70vh] w-full rounded-xl border border-line"
                  />
                ) : (
                  <p className="mt-2 text-xs text-ink-3">
                    Preview isn&apos;t available for this file type — use the link above to download it.
                  </p>
                )}
              </div>
            ) : resume?.source === "link" && resume.pastedLink ? (
              <a
                href={resume.pastedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-light px-4 py-2.5 text-sm font-bold text-blue"
              >
                <LinkSimpleIcon size={16} weight="bold" />
                Resume link
              </a>
            ) : (
              <p className="text-sm text-ink-2">No resume provided.</p>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-4 text-[11px] font-black tracking-widest text-ink-3 uppercase">Portfolio</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Portfolio link" value={app.portfolio?.portfolioLink} />
              <Field label="Instagram / YouTube" value={app.portfolio?.socialLink} />
            </div>
            {app.portfolio?.sampleLinks && (
              <div className="mt-4">
                <p className="text-[11px] font-bold tracking-wide text-ink-3 uppercase">Sample links</p>
                <p className="mt-1 text-sm whitespace-pre-line text-ink">{app.portfolio.sampleLinks}</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-4 text-[11px] font-black tracking-widest text-ink-3 uppercase">Tools &amp; experience</p>
            <div className="flex flex-col gap-4">
              {app.experience?.contentTypes && app.experience.contentTypes.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-ink-3 uppercase">Content types</p>
                  <p className="mt-1 text-sm text-ink">{app.experience.contentTypes.join(", ")}</p>
                </div>
              )}
              <ToolList label="Video editing tools" tools={app.tools?.video ?? []} />
              <Field label="Other video tools" value={app.otherVideoTools} />
              <ToolList label="Photo editing tools" tools={app.tools?.photo ?? []} />
              <Field label="Other photo tools" value={app.otherPhotoTools} />
              <ToolList label="AI tools" tools={app.tools?.ai ?? []} />
              <Field label="Other AI tools" value={app.otherAiTools} />
              <ToolList label="SEO tools" tools={app.tools?.seo ?? []} />
              <Field label="Other SEO tools" value={app.otherSeoTools} />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="mb-4 text-[11px] font-black tracking-widest text-ink-3 uppercase">Final questions</p>
            <div className="flex flex-col gap-4">
              <Field label="Proudest work" value={app.proudVideo} />
              <Field label="How they heard about this role" value={app.howHeard} />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <StatusForm id={String(app._id)} status={app.status ?? "new"} notes={app.notes ?? ""} />
        </div>
      </div>
    </div>
  );
}
