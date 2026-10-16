import { YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const longForm = [
  { id: "Dat6ravpais", title: "Cure Stone, Video 1" },
  { id: "58xpnqdCPzU", title: "Cure Stone, Video 2" },
  { id: "h9Su8zxoivs", title: "Cure Stone, Video 3" },
];

const shorts = [
  { id: "SV48q2IUGmo", title: "Cure Stone, Short 1" },
  { id: "JXyuQg3sHOw", title: "Cure Stone, Short 2" },
  { id: "to6PbLLCD64", title: "Cure Stone, Short 3" },
];

export function Videos() {
  return (
    <section id="videos" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="mb-10">
          <h2 className="mb-3.5 text-[clamp(26px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.025em]">
            The patient education you&apos;d help create
          </h2>
          <p className="max-w-[560px] text-base leading-[1.75] text-ink-2">
            A look at how we turn Dr. Deepanshu Gupta&apos;s clinical expertise into videos that help
            patients understand kidney health and treatment, reaching millions along the way.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {longForm.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.06}>
              <div className="aspect-video overflow-hidden rounded-2xl bg-[#0f172a] shadow-[0_4px_20px_rgba(0,0,0,.1)]">
                <iframe
                  className="h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 mb-5 flex items-center gap-2 text-sm font-bold text-ink">
          <YoutubeLogoIcon size={18} weight="fill" className="shrink-0 text-[#ff0000]" />
          YouTube Shorts
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {shorts.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.06}>
              <div className="aspect-9/16 overflow-hidden rounded-2xl bg-[#0f172a] shadow-[0_4px_20px_rgba(0,0,0,.1)]">
                <iframe
                  className="h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-[10px] bg-[#ff0000] px-7 py-3.25 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,0,0,.3)] transition-all hover:-translate-y-0.5 hover:bg-[#cc0000]"
          >
            <YoutubeLogoIcon size={18} weight="fill" className="shrink-0 text-white" />
            Watch more videos
          </a>
        </div>
      </div>
    </section>
  );
}
