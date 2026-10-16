import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getRoleIcon } from "@/lib/role-icons";
import { formatSalary, getPublishedRoles } from "@/lib/roles";
import { Reveal } from "./Reveal";

export async function Positions() {
  const roles = await getPublishedRoles();

  return (
    <section id="positions" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mb-3.5 inline-block rounded-full bg-blue-light px-3.5 py-1 text-[11px] font-bold tracking-[0.1em] text-blue uppercase">
            Open Positions
          </div>
          <h2 className="mb-3.5 text-[clamp(26px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.025em]">
            Join the team behind the channel
          </h2>
          <p className="mb-10 max-w-[560px] text-base leading-[1.75] text-ink-2">
            Open roles in Gurugram. Pick the one that matches your craft.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {roles.map((role, i) => {
            const Icon = getRoleIcon(role.icon);
            return (
              <Reveal key={role.slug} delay={i * 0.08}>
                <Link
                  href={`/careers/${role.slug}`}
                  className="group flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 transition-all hover:border-blue-mid hover:shadow-[0_8px_28px_rgba(43,92,230,.1)] sm:flex-row sm:items-center sm:p-7"
                >
                  <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-blue-light">
                    <Icon size={26} weight="regular" className="text-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="text-lg font-bold text-ink">{role.title}</h3>
                      <span className="rounded-md bg-[#dcfce7] px-2.25 py-0.75 text-[11px] font-semibold text-[#15803d]">
                        Now hiring
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-2">{role.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-ink-2">
                        {role.employmentLabel}
                      </span>
                      <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-ink-2">
                        {role.schedule}
                      </span>
                      <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-ink-2">
                        On-site, Gurugram
                      </span>
                      <span className="rounded-md bg-blue-light px-2.5 py-1 text-xs font-semibold text-blue">
                        {formatSalary(role)}
                        {role.salaryDisclosed ? " / mo" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-blue sm:pl-4">
                    View role
                    <ArrowUpRightIcon
                      size={16}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
