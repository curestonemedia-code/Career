// Shared between the client form and the server route, so both enforce the
// same limit. No server-only / DB imports here — this must be safe to pull
// into a Client Component bundle (see lib/format-salary.ts for why).
export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_RESUME_SIZE_LABEL = "5 MB";
export const ACCEPTED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
