import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarBlankIcon,
  CameraIcon,
  CheckIcon,
  ClockIcon,
  CurrencyInrIcon,
  ListChecksIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { getRoleIcon } from "@/lib/role-icons";
import type { Role } from "@/lib/roles";
import { formatSalary, getPublishedRoles } from "@/lib/roles";
import { Reveal } from "./Reveal";

const colorMap: Record<string, { bg: string; text: string }> = {
  bl: { bg: "bg-[#dbeafe]", text: "text-[#2563eb]" },
  gr: { bg: "bg-[#dcfce7]", text: "text-[#16a34a]" },
  or: { bg: "bg-[#ffedd5]", text: "text-[#ea580c]" },
  pu: { bg: "bg-[#ede9fe]", text: "text-[#7c3aed]" },
};

function Section({
  color,
  Icon,
  title,
  items,
}: {
  color: string;
  Icon: typeof CheckIcon;
  title: string;
  items: string[];
}) {
  return (
    <div className="relative pl-6">
      <div className={`absolute top-1 bottom-1 left-0 w-1 rounded-full ${colorMap[color].bg}`} />
      <h2 className="mb-4 flex items-center gap-2.5 text-lg font-black text-ink">
        <Icon size={19} weight="bold" className={colorMap[color].text} />
        {title}
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-ink-2">
            <span
              className={`mt-0.5 flex h-4.5 w-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full ${colorMap[color].bg}`}
            >
              <CheckIcon size={9} weight="bold" className={colorMap[color].text} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function RoleDetail({ role }: { role: Role }) {
  const HeaderIcon = getRoleIcon(role.icon);
  const isClosed = role.status === "closed";
  const publishedRoles = await getPublishedRoles();
  const otherRoles = publishedRoles.filter((r) => r.slug !== role.slug);

  return (
    <div className="bg-white px-6 pt-28 pb-24">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <Link
            href="/#positions"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-2 transition-colors hover:text-blue"
          >
            <ArrowLeftIcon size={14} weight="bold" />
            All open roles
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-5 flex flex-wrap items-start justify-between gap-6 border-b border-line pb-10">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue/5">
              {/* getRoleIcon always returns a stable reference from the fixed icon registry, never a newly-created component. */}
              {/* eslint-disable-next-line react-hooks/static-components */}
              <HeaderIcon size={28} weight="regular" className="text-blue" />
            </div>
            <div>
              {isClosed ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-0.75 text-[10px] font-black tracking-widest text-ink-3 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-3" />
                  No longer accepting applications
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-2.5 py-0.75 text-[10px] font-black tracking-widest text-[#15803d] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                  Now hiring
                </span>
              )}
              <h1 className="mt-2 text-[32px] leading-tight font-black tracking-tight text-ink sm:text-[40px]">
                {role.title}
              </h1>
              <p className="mt-1.5 max-w-lg text-[15px] text-ink-2">{role.tagline}</p>
            </div>
          </div>

          {!isClosed && (
            <Link
              href={`/apply?role=${role.slug}`}
              className="group relative shrink-0 rounded-full bg-blue px-8 py-3.5 text-sm font-black tracking-wide text-white uppercase shadow-lg shadow-blue/25"
            >
              <span className="absolute inset-[-3px] rounded-full border-2 border-blue transition-colors group-hover:border-blue-dark" />
              <span className="relative">Apply now</span>
            </Link>
          )}
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="text-[16px] leading-[1.8] text-ink-2">{role.description}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <Section
                color="bl"
                title="Responsibilities"
                items={role.responsibilities}
                Icon={ListChecksIcon}
              />
            </Reveal>

            <Reveal delay={0.1}>
              <Section color="gr" title="Requirements" items={role.requirements} Icon={ShieldCheckIcon} />
            </Reveal>

            {role.bonusSkills && (
              <Reveal delay={0.15}>
                <Section
                  color="or"
                  title="Bonus skills (nice to have)"
                  items={role.bonusSkills}
                  Icon={StarIcon}
                />
              </Reveal>
            )}

            {role.equipment && (
              <Reveal delay={0.2}>
                <div className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ede9fe]">
                    <CameraIcon size={20} weight="bold" className="text-[#7c3aed]" />
                  </div>
                  <div>
                    <div className="mb-1.5 text-sm font-black text-ink">{role.equipment.title}</div>
                    <p className="text-[13.5px] leading-[1.6] text-ink-2">{role.equipment.body}</p>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.25} className="rounded-3xl bg-gradient-to-br from-[#0a1228] to-[#1a3a8a] p-8 text-center sm:p-10">
              {isClosed ? (
                <>
                  <p className="text-lg font-black text-white">This role is no longer open</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
                    We&apos;ve stopped accepting applications for this position, but take a look
                    at our other open roles.
                  </p>
                  <Link
                    href="/#positions"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-black text-ink transition-all hover:-translate-y-0.5"
                  >
                    View open roles
                    <ArrowRightIcon size={16} weight="bold" className="text-blue" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-lg font-black text-white">Ready to apply?</p>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
                    It takes about 5 minutes. Share your portfolio and we&apos;ll be in touch
                    within 3 to 5 business days.
                  </p>
                  <Link
                    href={`/apply?role=${role.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-black text-ink transition-all hover:-translate-y-0.5"
                  >
                    Apply for this role
                    <ArrowRightIcon size={16} weight="bold" className="text-blue" />
                  </Link>
                </>
              )}
            </Reveal>
          </div>

          {/* Sticky sidebar */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-line bg-surface p-6">
                <div className="mb-5 border-b border-line pb-5">
                  <p className="text-[10px] font-black tracking-widest text-ink-3 uppercase">
                    Monthly salary
                  </p>
                  <p className="mt-1 text-[26px] font-black text-blue">{formatSalary(role)}</p>
                </div>
                <dl className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <CurrencyInrIcon size={17} weight="bold" className="shrink-0 text-ink-3" />
                    <dt className="sr-only">Employment type</dt>
                    <dd className="text-[13.5px] font-bold text-ink">{role.employmentLabel}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarBlankIcon size={17} weight="bold" className="shrink-0 text-ink-3" />
                    <dt className="sr-only">Schedule</dt>
                    <dd className="text-[13.5px] font-bold text-ink">{role.schedule}</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon size={17} weight="bold" className="shrink-0 text-ink-3" />
                    <dt className="sr-only">Location</dt>
                    <dd className="text-[13.5px] font-bold text-ink">On-site, Gurugram</dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon size={17} weight="bold" className="shrink-0 text-ink-3" />
                    <dt className="sr-only">Response time</dt>
                    <dd className="text-[13.5px] font-bold text-ink">Replies in 3 to 5 days</dd>
                  </div>
                </dl>
                {isClosed ? (
                  <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-surface py-3.5 text-sm font-black text-ink-3">
                    Applications closed
                  </div>
                ) : (
                  <Link
                    href={`/apply?role=${role.slug}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue py-3.5 text-sm font-black text-white shadow-lg shadow-blue/20 transition-all hover:-translate-y-0.5 hover:bg-blue-dark"
                  >
                    Apply for this role
                  </Link>
                )}
              </div>

              {otherRoles.length > 0 && (
                <div className="mt-5 rounded-3xl border border-line p-6">
                  <p className="mb-4 text-[10px] font-black tracking-widest text-ink-3 uppercase">
                    Other open roles
                  </p>
                  <div className="flex flex-col gap-3">
                    {otherRoles.map((r) => {
                      const Icon = getRoleIcon(r.icon);
                      return (
                        <Link
                          key={r.slug}
                          href={`/careers/${r.slug}`}
                          className="group flex items-center gap-3 rounded-2xl border border-line p-3 transition-all hover:border-blue-mid hover:bg-blue-light"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-light text-blue group-hover:bg-white">
                            <Icon size={16} weight="regular" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-bold text-ink">{r.title}</p>
                            <p className="text-[11px] text-ink-2">{formatSalary(r)} / mo</p>
                          </div>
                          <ArrowRightIcon
                            size={14}
                            weight="bold"
                            className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-blue"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
