import {
  HeartbeatIcon,
  MapTrifoldIcon,
  MedalIcon,
  ShieldCheckIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const pills = [
  { label: "Healthcare Media", Icon: HeartbeatIcon },
  { label: "Video Production", Icon: VideoCameraIcon },
  { label: "Gurugram, India", Icon: MapTrifoldIcon },
];

const metrics = [
  { n: siteConfig.stats.surgeries, l: "Surgeries performed", color: "bl", Icon: HeartbeatIcon },
  { n: siteConfig.stats.patientsTreated, l: "Patients treated", color: "gr", Icon: UsersIcon },
  { n: siteConfig.stats.successRate, l: "Stone-free success rate", color: "pu", Icon: ShieldCheckIcon },
  { n: siteConfig.stats.yearsExperience, l: "Years of experience", color: "or", Icon: MedalIcon },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  bl: { bg: "bg-[#dbeafe]", text: "text-[#2563eb]" },
  gr: { bg: "bg-[#dcfce7]", text: "text-[#16a34a]" },
  pu: { bg: "bg-[#ede9fe]", text: "text-[#7c3aed]" },
  or: { bg: "bg-[#ffedd5]", text: "text-[#ea580c]" },
};

export function About() {
  return (
    <section id="about" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 className="mb-3.5 text-[clamp(26px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.025em]">
            Advanced kidney care trusted by thousands of patients
          </h2>
          <p className="max-w-[560px] text-base leading-[1.75] text-ink-2">
            Cure Stone is Gurugram&apos;s leading destination for advanced kidney stone laser
            treatment. We combine cutting-edge medical technology with compassionate care,
            helping patients get back to their lives faster, with minimally invasive and maximum
            precision.
          </p>
          <p className="mt-3.5 max-w-[560px] text-base leading-[1.75] text-ink-2">
            Beyond the clinic, we believe an informed patient is an empowered patient. Through our
            YouTube channel and social media, we share that same clinical expertise with millions,
            educating patients on kidney health, stone prevention, and what to expect from modern
            laser treatment.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {pills.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-[13px] font-medium text-ink-2"
              >
                <pill.Icon size={16} weight="regular" className="shrink-0 text-blue" />
                {pill.label}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal
          delay={0.1}
          className="flex flex-col gap-4 rounded-[20px] bg-gradient-to-br from-[#eff6ff] to-[#ede9fe] p-8"
        >
          {metrics.map((m) => (
            <div
              key={m.l}
              className="flex items-center gap-4 rounded-xl bg-white p-4.5 px-5.5 shadow-[0_1px_6px_rgba(0,0,0,.05)]"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${colorMap[m.color].bg}`}
              >
                <m.Icon size={22} weight="regular" className={colorMap[m.color].text} />
              </div>
              <div>
                <div className="text-[22px] leading-none font-extrabold text-ink">{m.n}</div>
                <div className="mt-0.5 text-xs text-ink-3">{m.l}</div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
