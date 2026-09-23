import "server-only";
import { connectDB } from "@/lib/db/connect";
import { LoginAttemptModel } from "@/lib/db/models/LoginAttempt";

const MAX_ATTEMPTS = 8;
const WINDOW_MINUTES = 15;

// Single shared admin credential means there's only one email+password pair
// to brute-force, so this is worth the small amount of extra code. Backed
// by Mongo (TTL-indexed, auto-expiring) rather than an in-memory Map so it
// survives restarts and works across multiple server instances.
export async function isRateLimited(ip: string): Promise<boolean> {
  await connectDB();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
  const count = await LoginAttemptModel.countDocuments({ ip, createdAt: { $gte: since } });
  return count >= MAX_ATTEMPTS;
}

export async function recordFailedAttempt(ip: string): Promise<void> {
  await connectDB();
  await LoginAttemptModel.create({ ip });
}
