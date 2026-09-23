import { PencilSimpleIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getRoleIcon } from "@/lib/role-icons";
import { formatSalary, getAllRolesAdmin } from "@/lib/roles";
import { setRoleStatus } from "./actions";

export const metadata = { title: "Jobs | Admin" };

const statusStyles: Record<string, string> = {
  draft: "bg-surface text-ink-3",
  published: "bg-[#dcfce7] text-[#15803d]",
  closed: "bg-[#fee2e2] text-[#991b1b]",
};

export default async function AdminJobsPage() {
  const roles = await getAllRolesAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-ink">Jobs</h1>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-2 rounded-xl bg-blue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-dark"
        >
          <PlusIcon size={16} weight="bold" />
          New job
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {roles.length === 0 && (
          <p className="rounded-2xl border border-line bg-white p-8 text-center text-sm text-ink-2">
            No jobs yet. Create your first one.
          </p>
        )}

        {roles.map((role) => {
          const Icon = getRoleIcon(role.icon);
          return (
            <div
              key={role.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-light">
                <Icon size={20} weight="regular" className="text-blue" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-ink">{role.title}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${statusStyles[role.status]}`}>
                    {role.status}
                  </span>
                </div>
                <p className="text-sm text-ink-2">
                  {formatSalary(role)} / mo · {role.employmentLabel} · /careers/{role.slug}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {role.status !== "published" && (
                  <form action={setRoleStatus.bind(null, role.id, "published")}>
                    <button
                      type="submit"
                      className="rounded-lg border border-line-2 px-3 py-2 text-xs font-bold text-ink-2 transition-colors hover:border-[#86efac] hover:text-[#15803d]"
                    >
                      Publish
                    </button>
                  </form>
                )}
                {role.status !== "closed" && (
                  <form action={setRoleStatus.bind(null, role.id, "closed")}>
                    <button
                      type="submit"
                      className="rounded-lg border border-line-2 px-3 py-2 text-xs font-bold text-ink-2 transition-colors hover:border-[#fecaca] hover:text-[#991b1b]"
                    >
                      Close
                    </button>
                  </form>
                )}
                <Link
                  href={`/admin/jobs/${role.slug}/edit`}
                  className="flex items-center gap-1.5 rounded-lg border border-line-2 px-3 py-2 text-xs font-bold text-ink-2 transition-colors hover:border-blue-mid hover:text-blue"
                >
                  <PencilSimpleIcon size={13} weight="bold" />
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
