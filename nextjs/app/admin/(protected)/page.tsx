import { ArrowRightIcon, FilesIcon, SparkleIcon, SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { connectDB } from "@/lib/db/connect";
import { ApplicationModel } from "@/lib/db/models/Application";
import { RoleModel } from "@/lib/db/models/Role";

export const metadata = { title: "Dashboard | Admin" };

async function getStats() {
  await connectDB();

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [totalApplications, newThisWeek, publishedRoles, recent] = await Promise.all([
    ApplicationModel.countDocuments({}),
    ApplicationModel.countDocuments({ createdAt: { $gte: weekAgo } }),
    RoleModel.countDocuments({ status: "published" }),
    ApplicationModel.find({}).sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  return { totalApplications, newThisWeek, publishedRoles, recent };
}

export default async function AdminDashboardPage() {
  const { totalApplications, newThisWeek, publishedRoles, recent } = await getStats();

  const cards = [
    { label: "Total applications", value: totalApplications, Icon: FilesIcon },
    { label: "New this week", value: newThisWeek, Icon: SparkleIcon },
    { label: "Published roles", value: publishedRoles, Icon: SquaresFourIcon },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-ink">Dashboard</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-line bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-light">
              <card.Icon size={18} weight="bold" className="text-blue" />
            </div>
            <p className="mt-4 text-3xl font-black text-ink">{card.value}</p>
            <p className="mt-1 text-sm text-ink-2">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-black tracking-widest text-ink-3 uppercase">Recent applications</h2>
          <Link href="/admin/applications" className="flex items-center gap-1 text-sm font-bold text-blue">
            View all
            <ArrowRightIcon size={14} weight="bold" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-2">No applications yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-line">
            {recent.map((app) => (
              <Link
                key={String(app._id)}
                href={`/admin/applications/${app._id}`}
                className="flex items-center justify-between py-3.5 transition-colors hover:bg-surface"
              >
                <div>
                  <p className="text-sm font-bold text-ink">{app.applicant?.name}</p>
                  <p className="text-xs text-ink-2">{app.roleTitle}</p>
                </div>
                <span className="rounded-full bg-blue-light px-2.5 py-1 text-[11px] font-bold text-blue capitalize">
                  {app.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
