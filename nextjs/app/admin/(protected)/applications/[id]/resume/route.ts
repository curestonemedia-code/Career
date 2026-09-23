import { verifySession } from "@/lib/auth/dal";
import { readResumeFile } from "@/lib/blob/upload";
import { connectDB } from "@/lib/db/connect";
import { ApplicationModel } from "@/lib/db/models/Application";

// Resumes live in a private Blob store (see lib/blob/upload.ts) and are
// never linked to directly — this route is the only way to reach one,
// gated by the same session check as the rest of /admin.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await verifySession();

  const { id } = await params;
  await connectDB();
  const app = await ApplicationModel.findById(id).lean().catch(() => null);
  const resume = app?.resume;
  if (!resume?.blobUrl) {
    return new Response("Resume not found", { status: 404 });
  }

  const file = await readResumeFile(resume.blobUrl);
  if (!file || file.statusCode !== 200) {
    return new Response("Resume not found", { status: 404 });
  }

  const fileName = (resume.fileName ?? "resume").replace(/"/g, "");
  return new Response(file.stream, {
    headers: {
      "Content-Type": file.blob.contentType || resume.mimeType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
