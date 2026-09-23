import {
  ChartLineUpIcon,
  CurrencyInrIcon,
  HeartIcon,
  PencilSimpleIcon,
  SparkleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const perks = [
  {
    span: "lg:col-span-7",
    bg: "bg-gradient-to-br from-[#eff6ff] to-white",
    iconBg: "bg-[#dbeafe]",
    iconColor: "text-[#2563eb]",
    Icon: PencilSimpleIcon,
    title: "Creative ownership",
    desc: "Your work shapes how millions of people find and understand health information. Real impact, not just output.",
  },
  {
    span: "lg:col-span-5",
    bg: "bg-gradient-to-br from-[#f0fdf4] to-white",
    iconBg: "bg-[#dcfce7]",
    iconColor: "text-[#16a34a]",
    Icon: CurrencyInrIcon,
    title: "Transparent pay",
    desc: "Role-based pay with performance reviews and real growth potential as you build your skills.",
  },
  {
    span: "lg:col-span-3",
    bg: "bg-surface",
    iconBg: "bg-[#f5f3ff]",
    iconColor: "text-[#7c3aed]",
    Icon: ChartLineUpIcon,
    title: "Grow with the channel",
    desc: "As the brand scales, so does your role, your skills, and your earnings.",
  },
  {
    span: "lg:col-span-3",
    bg: "bg-surface",
    iconBg: "bg-[#fff7ed]",
    iconColor: "text-[#ea580c]",
    Icon: UsersThreeIcon,
    title: "Small, focused team",
    desc: "Work directly with Dr. Deepanshu Gupta and skip the bureaucracy.",
  },
  {
    span: "lg:col-span-3",
    bg: "bg-surface",
    iconBg: "bg-[#fef2f2]",
    iconColor: "text-[#dc2626]",
    Icon: HeartIcon,
    title: "Mission-driven work",
    desc: "Your content contributes to a healthier, more informed India.",
  },
  {
    span: "lg:col-span-3",
    bg: "bg-surface",
    iconBg: "bg-[#ecfdf5]",
    iconColor: "text-[#059669]",
    Icon: SparkleIcon,
    title: "AI-forward culture",
    desc: "We embrace AI tools across editing, SEO, and production, and you'll get to experiment with them.",
  },
];

export function Perks() {
  return (
    <section id="perks" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mx-auto mb-12 max-w-[560px] text-center">
          <h2 className="mb-3.5 text-[clamp(26px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.025em]">
            A role worth your talent
          </h2>
          <p className="mx-auto text-base leading-[1.75] text-ink-2">
            A small, fast-moving team with big goals. Real ownership and a direct line to an
            audience of millions.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className={p.span}>
              <div
                className={`h-full rounded-2xl border border-line p-7 transition-all hover:border-blue-mid hover:shadow-[0_4px_18px_rgba(43,92,230,.1)] ${p.bg}`}
              >
                <div className={`mb-4 flex h-13 w-13 items-center justify-center rounded-2xl ${p.iconBg}`}>
                  <p.Icon size={26} weight="regular" className={p.iconColor} />
                </div>
                <div className="mb-1.75 text-[15px] font-bold text-ink">{p.title}</div>
                <div className="text-[13px] leading-[1.65] text-ink-2">{p.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
