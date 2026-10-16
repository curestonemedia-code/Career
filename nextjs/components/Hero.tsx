"use client";

import { ArrowRightIcon, StethoscopeIcon, UsersThreeIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

export function Hero({ openRoleCount }: { openRoleCount: number }) {
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#070e24] px-6 pt-24 pb-24 text-center">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(140deg, rgba(7,14,36,.85) 0%, rgba(13,31,92,.75) 50%, rgba(26,63,181,.65) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-2"
        style={{
          backgroundImage:
            "linear-gradient(rgba(43,92,230,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,92,230,.1) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
      <div className="absolute -top-55 -right-50 z-2 h-160 w-160 rounded-full bg-[#2b5ce6]/18 blur-[90px]" />
      <div className="absolute -bottom-30 -left-30 z-2 h-105 w-105 rounded-full bg-[#6366f1]/14 blur-[90px]" />

      <div className="relative z-3 max-w-3xl">
        <motion.div
          {...fadeUp(0)}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue/45 bg-blue/22 px-4 py-1.5 text-[11px] font-bold tracking-[0.07em] text-[#93c5fd] uppercase"
        >
          <UsersThreeIcon size={14} weight="bold" />
          {openRoleCount} Open Position{openRoleCount === 1 ? "" : "s"} &nbsp;·&nbsp; Gurugram
        </motion.div>
        <motion.h1
          {...fadeUp(0.08)}
          className="mb-6 text-[clamp(38px,6.5vw,74px)] leading-[1.08] font-extrabold tracking-[-0.035em] text-white"
        >
          Join Gurugram&apos;s Leading
          <br />
          <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
            Kidney Care Team
          </span>
        </motion.h1>
        <motion.p
          {...fadeUp(0.16)}
          className="mx-auto mb-5 max-w-lg text-[clamp(15px,2vw,19px)] leading-[1.75] text-white/62"
        >
          We&apos;re <strong className="font-semibold text-white/88">Cure Stone</strong>, a kidney
          health practice and media brand in Gurugram — hiring across clinical and content roles
          to help more patients get the care they need.
        </motion.p>
        <motion.div
          {...fadeUp(0.2)}
          className="mb-10 inline-flex items-center gap-2 text-[13px] font-medium text-white/55"
        >
          <StethoscopeIcon size={15} weight="bold" className="text-[#93c5fd]" />
          Led by {siteConfig.founder.name}, {siteConfig.founder.title}
        </motion.div>
        <motion.div
          {...fadeUp(0.28)}
          className="flex flex-wrap items-center justify-center gap-3.5"
        >
          <a
            href="#positions"
            className="inline-flex items-center gap-2 rounded-[10px] bg-blue px-7.5 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_28px_rgba(43,92,230,.5)] transition-all hover:-translate-y-0.5 hover:bg-blue-dark hover:shadow-[0_8px_36px_rgba(43,92,230,.55)]"
          >
            View Open Positions
            <ArrowRightIcon size={16} weight="bold" />
          </a>
          <a
            href="#doctor"
            className="inline-flex items-center gap-2 rounded-[10px] border border-white/18 px-6 py-3.5 text-[15px] font-medium text-white/78 transition-colors hover:bg-white/8 hover:text-white"
          >
            Meet Dr. Deepanshu Gupta
          </a>
        </motion.div>
      </div>
    </div>
  );
}
