import {
  ChatCircleTextIcon,
  HeartbeatIcon,
  MapPinIcon,
  MedalIcon,
  PlayIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const tags = [
  "Urology",
  "Kidney Stone Treatment",
  "Laser Surgery",
  "Minimally Invasive Procedures",
  "Healthcare Education",
  "YouTube Creator",
];

const stats = [
  { n: siteConfig.stats.subscribers, l: "YouTube subscribers" },
  { n: siteConfig.stats.views, l: "Total views" },
  { n: siteConfig.stats.videosPublished, l: "Videos published" },
  { n: siteConfig.stats.yearsActive, l: "Building content" },
];

const highlights = [
  {
    Icon: TargetIcon,
    text: "Direct mentor on every hire",
    subtext: "You'll work with him personally, not through layers of management.",
  },
  {
    Icon: MedalIcon,
    text: "Built Cure Stone from zero",
    subtext: "Founded the YouTube channel and grew it to 730K+ subscribers.",
  },
  {
    Icon: HeartbeatIcon,
    text: "Practicing urologist",
    subtext: "Leads advanced kidney stone laser treatment in Gurugram.",
  },
  {
    Icon: ChatCircleTextIcon,
    text: "Hands-on creative input",
    subtext: "Involved in scripting, pacing, and storytelling on every video.",
  },
];

export function Doctor() {
  return (
    <section id="doctor" className="relative overflow-hidden bg-[#ebf4fd] px-6 py-24">
      <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 -translate-y-1/3 translate-x-1/4 rounded-full bg-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-100 w-100 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#6366f1]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1100px]">
        <Reveal className="mb-14 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-blue" />
            <span className="text-[11px] font-black tracking-[0.15em] text-blue uppercase">
              Meet the Founder
            </span>
          </span>
          <h2 className="text-[clamp(28px,5vw,48px)] leading-[1.1] font-black tracking-tight text-ink">
            You&apos;ll build content
            <br />
            alongside <span className="text-blue">{siteConfig.founder.name}</span>
          </h2>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Photo + location */}
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-[0_32px_64px_-16px_rgba(43,92,230,0.2)]">
              <Image
                src="/doctor.png"
                alt={siteConfig.founder.name}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a4d]/90 via-[#0a1a4d]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="text-xl font-black text-white">{siteConfig.founder.name}</h3>
                <p className="mt-1 text-[13px] font-bold text-blue-100">{siteConfig.founder.title}</p>
              </div>
            </div>

            <div className="mx-auto mt-5 flex max-w-md items-center gap-4 rounded-[1.75rem] border border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue text-white shadow-lg shadow-blue/25">
                <MapPinIcon size={20} weight="bold" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-[0.15em] text-ink-3 uppercase">
                  You&apos;d work here
                </p>
                <p className="mt-1 text-[13px] leading-snug font-bold text-ink">
                  {siteConfig.addressLines.street}, {siteConfig.addressLines.locality}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-[17px] leading-relaxed text-ink-2">
              Dr. Deepanshu Gupta is a leading Urologist, healthcare educator, and founder of Cure
              Stone in Gurugram. Through Cure Stone&apos;s YouTube channel and social media, he
              simplifies complex medical topics into content that helps thousands of people make
              informed healthcare decisions, and every open role works directly with him.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-blue/10 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue/5"
                >
                  <p className="text-xl font-black tracking-tight text-ink">{s.n}</p>
                  <p className="mt-1 text-[10px] font-bold tracking-wide text-ink-3 uppercase">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  key={h.text}
                  className="group flex gap-3.5 rounded-2xl border border-white bg-white/60 p-4.5 transition-all hover:bg-white"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue shadow-sm transition-colors group-hover:bg-blue group-hover:text-white">
                    <h.Icon size={18} weight="bold" />
                  </div>
                  <div>
                    <p className="text-[13px] leading-tight font-black text-ink">{h.text}</p>
                    <p className="mt-1 text-[11.5px] leading-snug font-medium text-ink-2">{h.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-default rounded-full border border-blue/10 bg-blue/5 px-4 py-2 text-xs font-bold text-blue transition-all hover:bg-blue hover:text-white hover:shadow-lg hover:shadow-blue/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#positions"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue px-7 py-4 text-sm font-black text-white shadow-[0_20px_40px_-12px_rgba(43,92,230,0.4)] transition-all hover:-translate-y-0.5 hover:bg-blue-dark"
              >
                View Open Roles
              </a>
              <a
                href="#videos"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-blue/15 bg-white px-7 py-4 text-sm font-black text-ink transition-all hover:border-blue/40 hover:bg-blue-light"
              >
                <PlayIcon size={18} weight="fill" className="text-blue" />
                Watch our videos
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
