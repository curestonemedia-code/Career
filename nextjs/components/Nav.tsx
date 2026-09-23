"use client";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  ListIcon,
  XIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#doctor", label: "Founder" },
  { href: "/#positions", label: "Open Roles" },
  { href: "/#videos", label: "Our Work" },
];

const socials = [
  { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeLogoIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramLogoIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookLogoIcon },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-100 border-b border-line bg-white/95 backdrop-blur-xl transition-all duration-300 ${
          scrolled ? "h-16 shadow-md" : "h-20"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <Link href="/" className="z-70 flex shrink-0 items-center">
            <div
              className={`relative transition-all duration-300 ${
                scrolled ? "h-9 w-28" : "h-11 w-32"
              }`}
            >
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                fill
                sizes="128px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-bold text-ink-2 transition-colors hover:text-blue"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <div className="flex items-center gap-3 border-r border-line pr-5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="text-ink-3 transition-colors hover:text-blue"
                >
                  <Icon size={17} weight="regular" />
                </a>
              ))}
            </div>

            <Link
              href="/#positions"
              className="group relative rounded-full bg-blue px-6 py-2.5 text-xs font-black tracking-widest text-white uppercase shadow-lg shadow-blue/25"
            >
              <span className="absolute inset-[-3px] rounded-full border-2 border-blue transition-colors group-hover:border-blue-dark" />
              <span className="relative whitespace-nowrap">View Openings</span>
            </Link>
          </div>

          <button
            type="button"
            className="p-2 text-blue lg:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <ListIcon size={28} weight="bold" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-101 bg-white transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-6">
          <div className="relative h-9 w-28">
            <Image src={siteConfig.logo} alt={siteConfig.name} fill sizes="112px" className="object-contain object-left" />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white"
          >
            <XIcon size={22} weight="bold" />
          </button>
        </div>

        <div className="flex h-[calc(100%-80px)] flex-col">
          <div className="space-y-2 p-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-xl border border-transparent p-4 text-lg font-black text-ink transition-all hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-6 rounded-t-[32px] bg-ink p-8 text-white">
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-blue"
                >
                  <Icon size={18} weight="regular" />
                </a>
              ))}
            </div>
            <Link
              href="/#positions"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-2xl border-b-4 border-blue-dark bg-blue py-5 text-center text-lg font-black shadow-2xl shadow-blue/40"
            >
              View Openings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
