import mongoose, { Schema, type InferSchemaType } from "mongoose";

// Tracks failed admin login attempts per IP for basic rate limiting. Since
// there's a single shared admin credential (not per-user accounts), an
// attacker only has to guess one email+password pair — this makes that
// meaningfully slower without needing a full user/lockout system.
const LoginAttemptSchema = new Schema({
  ip: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 15 },
});

LoginAttemptSchema.index({ ip: 1, createdAt: -1 });

export type LoginAttemptDocument = InferSchemaType<typeof LoginAttemptSchema>;

export const LoginAttemptModel =
  mongoose.models.LoginAttempt ?? mongoose.model("LoginAttempt", LoginAttemptSchema);
