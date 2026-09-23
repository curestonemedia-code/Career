import "server-only";
import { del, put } from "@vercel/blob";
import { MAX_RESUME_SIZE_BYTES } from "@/lib/resume-constraints";

/**
 * Resume storage via Vercel Blob. BLOB_READ_WRITE_TOKEN is auto-injected
 * when a Blob store is connected to the Vercel project (Storage tab ->
 * Create Database -> Blob); for local dev, copy that same token into .env.
 *
 * Like the rest of this app's optional integrations, uploadResumeIfConfigured
 * checks for its own config and returns null (never throws for missing
 * config) so the apply flow keeps working via the pasted-link fallback if
 * the token isn't set.
 */

export type BlobUploadResult = {
  blobUrl: string;
  fileName: string;
  mimeType: string;
  size: number;
};

export class ResumeTooLargeError extends Error {
  constructor() {
    super("Resume file exceeds the 5 MB limit.");
    this.name = "ResumeTooLargeError";
  }
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/** Returns null (never throws for missing config) if Blob isn't configured. */
export async function uploadResumeIfConfigured(
  file: File,
  applicantName: string,
): Promise<BlobUploadResult | null> {
  if (!isBlobConfigured()) return null;
  if (file.size > MAX_RESUME_SIZE_BYTES) throw new ResumeTooLargeError();

  const safeName =
    applicantName
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase() || "applicant";
  const pathname = `resumes/${safeName}-${Date.now()}-${file.name}`;

  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type || "application/octet-stream",
  });

  return {
    blobUrl: blob.url,
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  };
}

/** Best-effort cleanup if the Mongo write fails after a successful upload. */
export async function deleteResumeFile(blobUrl: string): Promise<void> {
  if (!isBlobConfigured()) return;
  await del(blobUrl);
}
