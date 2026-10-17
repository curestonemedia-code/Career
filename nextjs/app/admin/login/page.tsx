"use client";

import Image from "next/image";
import { Outfit } from "next/font/google";
import { type AnimationEvent, useActionState, useState } from "react";
import { login } from "@/app/admin/actions/auth";
import { siteConfig } from "@/lib/site-config";
import styles from "./login.module.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Visual clone of the Cure Stone CRM's login page (see login.module.css for
// provenance) — same card layout, Material-style floating labels, and
// autofill handling, retitled for the careers/HRM admin panel.
function handleAutoFill(setter: (v: string) => void) {
  return (e: AnimationEvent<HTMLInputElement>) => {
    if (e.animationName === "mdc-autofill-start") {
      setter(e.currentTarget.value);
    }
  };
}

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles["login-page"]} ${outfit.className}`}>
      <div className={styles["bg-graphics"]}>
        <div className={styles["bg-dots"]} />
        <div className={`${styles["bg-blob"]} ${styles["bg-blob-1"]}`} />
        <div className={`${styles["bg-blob"]} ${styles["bg-blob-2"]}`} />
        <div className={`${styles["bg-blob"]} ${styles["bg-blob-3"]}`} />
        <div className={`${styles["bg-blob"]} ${styles["bg-blob-4"]}`} />
      </div>

      <div className={styles["gc-card"]}>
        <div className={styles["gc-left"]}>
          <div>
            <div className={styles["gc-logo"]}>
              <Image src={siteConfig.logo} alt={siteConfig.name} width={140} height={44} className="h-11 w-auto object-contain object-left" />
            </div>
            <div className={styles["gc-features"]} style={{ marginTop: 40 }}>
              <div className={styles["gc-feat-item"]}>
                <div className={`${styles["gc-feat-icon"]} ${styles.blue}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <span>Review job applications &amp; candidates</span>
              </div>
              <div className={styles["gc-feat-item"]}>
                <div className={`${styles["gc-feat-icon"]} ${styles.green}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" />
                  </svg>
                </div>
                <span>Post &amp; manage open roles</span>
              </div>
              <div className={styles["gc-feat-item"]}>
                <div className={`${styles["gc-feat-icon"]} ${styles.yellow}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 6 10-6" />
                  </svg>
                </div>
                <span>Email alerts on every new applicant</span>
              </div>
            </div>
          </div>
          <p className={styles["gc-left-footer"]}>Cure Stone HRM</p>
        </div>

        <div className={styles["gc-right"]}>
          <h1 className={styles["gc-heading"]}>Sign in</h1>
          <p className={styles["gc-right-title"]}>Welcome back</p>
          <p className={styles["gc-right-sub"]}>Sign in with your admin email</p>

          <form action={formAction} autoComplete="off">
            <div className={styles["mdc-field"]}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                autoComplete="username"
                required
                className={state?.error ? styles["has-error"] : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onAnimationStart={handleAutoFill(setEmail)}
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className={styles["mdc-field"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder=" "
                autoComplete="current-password"
                required
                className={state?.error ? styles["has-error"] : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onAnimationStart={handleAutoFill(setPassword)}
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className={styles["mdc-eye"]}
                tabIndex={-1}
                title="Show / hide password"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {state?.error && (
              <div className={styles["gc-error"]}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {state.error}
              </div>
            )}

            <div className={styles["gc-btn-row"]}>
              <button type="submit" className={styles["gc-submit"]} disabled={pending}>
                {pending ? "Signing in…" : "Sign In"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
