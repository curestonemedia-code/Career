import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-center"
      style={{
        background: "linear-gradient(140deg, #070e24 0%, #0f2460 60%, #1a3fb5 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,92,230,.09) 1px, transparent 1px), linear-gradient(90deg, rgba(43,92,230,.09) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <Reveal className="relative mx-auto max-w-[1100px]">
        <h2 className="mb-4 text-[clamp(28px,5vw,54px)] leading-[1.12] font-extrabold tracking-[-0.03em] text-white">
          Let&apos;s make something
          <br />
          great together.
        </h2>
        <p className="mx-auto mb-10 max-w-[460px] text-[17px] leading-[1.7] text-white/58">
          Three roles are open right now. Find the one that fits and apply in about 5 minutes.
        </p>
        <a
          href="#positions"
          className="inline-flex items-center gap-2.5 rounded-xl bg-white px-9.5 py-4 text-base font-bold text-ink shadow-[0_4px_28px_rgba(0,0,0,.28)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,.32)]"
        >
          View Openings
          <ArrowRightIcon size={20} weight="bold" className="text-blue" />
        </a>
        <div className="mt-5.5 text-[13px] text-white/38">
          Questions?{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-white/55 hover:text-white/82">
            {siteConfig.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
