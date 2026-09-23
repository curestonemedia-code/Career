"use server";

import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isRateLimited, recordFailedAttempt } from "@/lib/auth/rate-limit";
import { createSession, deleteSession } from "@/lib/auth/session";

const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type LoginState = { error?: string } | undefined;

const GENERIC_ERROR = "Invalid email or password.";

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: GENERIC_ERROR };

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (await isRateLimited(ip)) {
    return { error: "Too many attempts. Please try again in a few minutes." };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminPasswordHash) {
    return { error: "Admin login isn't configured yet." };
  }

  const emailMatches = parsed.data.email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await bcrypt.compare(parsed.data.password, adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    await recordFailedAttempt(ip);
    return { error: GENERIC_ERROR };
  }

  await createSession(adminEmail);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
