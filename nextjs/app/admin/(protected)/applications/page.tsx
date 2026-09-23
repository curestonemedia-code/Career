import Link from "next/link";
import { connectDB } from "@/lib/db/connect";
import { ApplicationModel } from "@/lib/db/models/Application";
import { getAllRolesAdmin } from "@/lib/roles";

export const metadata = { title: "Applications | Admin" };

const PAGE_SIZE = 20;

const statusOptions = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;
const statusStyles: Record<string, string> = {
  new: "bg-blue-light text-blue",
  reviewing: "bg-[#fff7ed] text-[#ea580c]",
  shortlisted: "bg-[#ede9fe] text-[#7c3aed]",
  rejected: "bg-[#fee2e2] text-[#991b1b]",
  hired: "bg-[#dcfce7] text-[#15803d]",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildFilter(status?: string, role?: string, q?: string): Record<string, any> {
  const filter: Record<string, unknown> = {};
  if (status) filter.status = status;
  if (role) filter.roleSlug = role;
  if (q) {
    filter.$or = [
      { "applicant.name": { $regex: q, $options: "i" } },
      { "applicant.email": { $regex: q, $options: "i" } },
    ];
  }
  return filter;
}

export default async function AdminApplicationsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const page = Math.max(1, Number(searchParams.page) || 1);
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined;
  const role = typeof searchParams.role === "string" ? searchParams.role : undefined;
  const q = typeof searchParams.q === "string" ? searchParams.q.trim() : undefined;

  await connectDB();
  const filter = buildFilter(status, role, q);

  const [applications, total, roles] = await Promise.all([
    ApplicationModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    ApplicationModel.countDocuments(filter),
    getAllRolesAdmin(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function pageHref(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (role) params.set("role", role);
    if (q) params.set("q", q);
    if (page > 1) params.set("page", String(page));
    for (const [key, value] of Object.entries(overrides)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    return qs ? `/admin/applications?${qs}` : "/admin/applications";
  }

  return (
    <div>
      <h1 className="text-2xl font-black text-ink">Applications</h1>
      <p className="mt-1 text-sm text-ink-2">{total} total</p>

      <form className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-line bg-white p-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name or email"
          className="min-w-[200px] flex-1 rounded-[7px] border border-line-2 px-3 py-2 text-sm"
        />
        <select name="status" defaultValue={status ?? ""} className="rounded-[7px] border border-line-2 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select name="role" defaultValue={role ?? ""} className="rounded-[7px] border border-line-2 px-3 py-2 text-sm">
          <option value="">All roles</option>
          {roles.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.title}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-[7px] bg-blue px-4 py-2 text-sm font-bold text-white">
          Filter
        </button>
      </form>

      <div className="mt-4 flex flex-col divide-y divide-line rounded-2xl border border-line bg-white">
        {applications.length === 0 && (
          <p className="p-8 text-center text-sm text-ink-2">No applications match these filters.</p>
        )}
        {applications.map((app) => (
          <Link
            key={String(app._id)}
            href={`/admin/applications/${app._id}`}
            className="flex flex-wrap items-center justify-between gap-3 p-5 transition-colors hover:bg-surface"
          >
            <div>
              <p className="font-bold text-ink">{app.applicant?.name}</p>
              <p className="text-sm text-ink-2">
                {app.roleTitle} · {app.applicant?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-ink-3">
                {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-IN") : ""}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${statusStyles[app.status ?? "new"]}`}>
                {app.status}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={pageHref({ page: String(p) })}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                p === page ? "bg-blue text-white" : "border border-line-2 text-ink-2"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
