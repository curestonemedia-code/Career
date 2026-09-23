"use client";

import { LockKeyIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useActionState } from "react";
import { login } from "@/app/admin/actions/auth";
import { siteConfig } from "@/lib/site-config";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src={siteConfig.logo} alt={siteConfig.name} width={140} height={40} className="h-10 w-auto" />
          <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue/5">
            <LockKeyIcon size={20} weight="bold" className="text-blue" />
          </div>
          <h1 className="mt-3 text-xl font-black text-ink">Admin login</h1>
          <p className="mt-1 text-sm text-ink-2">Cure Stone Careers</p>
        </div>

        <form action={formAction} className="rounded-[14px] border border-line bg-white p-7">
          <div className="mb-4">
            <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-ink-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="w-full rounded-[7px] border border-line-2 bg-white px-3.25 py-2.5 text-sm text-ink transition-shadow focus:border-blue focus:shadow-[0_0_0_3px_rgba(43,92,230,.1)] focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-ink-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-[7px] border border-line-2 bg-white px-3.25 py-2.5 text-sm text-ink transition-shadow focus:border-blue focus:shadow-[0_0_0_3px_rgba(43,92,230,.1)] focus:outline-none"
            />
          </div>

          {state?.error && (
            <div className="mb-4 rounded-[7px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-center text-[13px] text-[#991b1b]">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-93 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
