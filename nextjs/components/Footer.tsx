import { FacebookLogoIcon, InstagramLogoIcon, YoutubeLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { getPublishedRoles } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeLogoIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramLogoIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookLogoIcon },
];

const bottomLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Founder", href: "/#doctor" },
  { label: "Open Roles", href: "/#positions" },
  { label: "Apply", href: "/apply" },
];

export async function Footer() {
  const roles = await getPublishedRoles().catch(() => []);

  const footerSections = [
    {
      title: "Open Roles",
      links: [
        ...roles.map((role) => ({ label: role.title, href: `/careers/${role.slug}` })),
        { label: "Apply Now", href: "/apply" },
      ],
    },
    {
      title: "About Cure Stone",
      links: [
        { label: "Who We Are", href: "/#about" },
        { label: "Meet the Founder", href: "/#doctor" },
        { label: "Our Work", href: "/#videos" },
        { label: "Why Join Us", href: "/#perks" },
      ],
    },
    {
      title: "Cure Stone",
      links: [
        { label: "Main Website", href: "https://thecurestone.com", external: true },
        { label: "About the Hospital", href: "https://thecurestone.com/about", external: true },
        { label: "Contact", href: "https://thecurestone.com/contact", external: true },
        { label: "Health Blog", href: "https://thecurestone.com/blog", external: true },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#08090a] pt-20 pb-10 text-white">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-block w-fit">
              <div className="relative h-11 w-40">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  fill
                  sizes="160px"
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
            <p className="max-w-sm text-[13px] leading-relaxed text-white/55">
              Cure Stone is a healthcare media brand in Gurugram, hiring across video, camera, and
              SEO roles to help more patients find and understand reliable kidney health
              information.
            </p>
            <div className="space-y-3 text-[13px]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-white/70 transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex gap-3 pt-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/45 transition-all hover:border-white/30 hover:bg-blue hover:text-white"
                >
                  <Icon size={16} weight="regular" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-5">
              <h2 className="text-[10px] font-bold tracking-[0.25em] text-white/35 uppercase">
                {section.title}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] text-white/62 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[13px] text-white/62 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Where you'd work */}
        <div className="mb-12 grid items-center gap-12 border-y border-white/5 py-12 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 lg:aspect-auto lg:h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.045641!3d28.485092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="opacity-90"
              title="Cure Stone location"
            />
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="mb-2 text-sm font-bold tracking-widest text-blue uppercase">
                Where you&apos;d work
              </h4>
              <p className="text-xl font-medium text-white/90">{siteConfig.legalName}</p>
              <p className="mt-1 text-sm text-white/50">
                {siteConfig.addressLines.street}, {siteConfig.addressLines.locality},{" "}
                {siteConfig.addressLines.region} {siteConfig.addressLines.postalCode}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] tracking-widest text-white/30 uppercase">Every role is</p>
              <p className="text-sm font-medium text-white/70">On-site, 6 days a week</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <p className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {bottomLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-bold tracking-widest text-white/30 uppercase transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
