import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

// Answer-first, specific, and citable on purpose — this is the single
// highest-leverage page for AI search engines (ChatGPT, Perplexity,
// Google AI Overviews) to quote directly, per GEO research showing
// FAQPage-structured content gets cited meaningfully more often.
const faqs = [
  {
    question: "What roles is Cure Stone currently hiring for?",
    answer:
      "Every open role is listed in the Open Positions section on this page, from clinical positions like Urologist to content roles like SEO Intern. We only list roles that are actively accepting applications — closed roles are removed from this list.",
  },
  {
    question: "Where is Cure Stone located, and is this an on-site role?",
    answer:
      "Cure Stone is based in Sector 52, Gurugram, Haryana. Every role is on-site, six days a week, working directly with Founder and Medical Director Dr. Deepanshu Gupta.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Filling out the application takes about 5 minutes. We reply to every applicant within 3 to 5 business days.",
  },
  {
    question: "Is the salary always listed on the job posting?",
    answer:
      "Most roles list a monthly salary range upfront on their job page. For a few roles, such as clinical positions, compensation is discussed personally with shortlisted candidates instead of posted publicly.",
  },
  {
    question: "What is Cure Stone?",
    answer: `${siteConfig.shortDescription} Our YouTube channel has ${siteConfig.stats.subscribers} subscribers and ${siteConfig.stats.views} views across ${siteConfig.stats.videosPublished} videos over ${siteConfig.stats.yearsActive}, educating patients on kidney health and treatment.`,
  },
  {
    question: "Do I need prior experience to apply?",
    answer:
      "It depends on the role. Some roles, like our SEO Intern position, welcome candidates early in their career with strong fresher portfolios. Others require specific professional qualifications. Each job posting lists its own requirements.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-surface px-6 py-24">
      <JsonLd data={faqSchema(faqs.map(({ question, answer }) => ({ question, answer })))} />
      <div className="mx-auto max-w-[760px]">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-3.5 text-[clamp(26px,4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.025em]">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-[480px] text-base leading-[1.75] text-ink-2">
            Everything candidates usually ask before applying.
          </p>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 0.04}>
              <details className="group rounded-2xl border border-line bg-white p-6 open:border-blue-mid">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <CaretDownIcon
                    size={16}
                    weight="bold"
                    className="shrink-0 text-ink-3 transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3.5 text-[14px] leading-[1.7] text-ink-2">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
