import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const stats = [
  { n: siteConfig.stats.surgeries, l: "Surgeries performed" },
  { n: siteConfig.stats.patientsTreated, l: "Patients treated" },
  { n: siteConfig.stats.successRate, l: "Stone-free success rate" },
  { n: "3", l: "Open roles" },
];

export function StatsStrip() {
  return (
    <div className="border-b border-line bg-[#070e24] px-6 py-10">
      <Reveal className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:justify-between">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-2xl leading-none font-extrabold text-white sm:text-[28px]">{s.n}</div>
            <div className="mt-1.5 text-[11px] tracking-[0.03em] text-white/45">{s.l}</div>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
