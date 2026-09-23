import { after } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { ApplicationModel } from "@/lib/db/models/Application";
import { ResumeTooLargeError, deleteResumeFile, uploadResumeIfConfigured } from "@/lib/blob/upload";
import { ApplySchema } from "@/lib/apply-schema";
import { MAX_RESUME_SIZE_BYTES, MAX_RESUME_SIZE_LABEL } from "@/lib/resume-constraints";
import { siteConfig } from "@/lib/site-config";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "6af9b002-8e1a-4476-8f36-302a4acb7bd6";

async function sendNotificationEmail(applicantName: string, roleTitle: string, email: string) {
  try {
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    fd.append("subject", `New application: ${roleTitle} - ${applicantName}`);
    fd.append("from_name", "Cure Stone Careers");
    fd.append("Applicant", applicantName);
    fd.append("Role", roleTitle);
    fd.append("Email", email);
    fd.append("Message", "Review this application in the admin panel: /admin/applications");
    await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
  } catch (err) {
    console.error("Failed to send application notification email:", err);
  }
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ success: false, message: "Invalid form submission." }, { status: 400 });
  }

  const resumeFile = formData.get("resume");
  if (resumeFile instanceof File && resumeFile.size > MAX_RESUME_SIZE_BYTES) {
    return Response.json(
      { success: false, message: `Resume file exceeds the ${MAX_RESUME_SIZE_LABEL} limit. Please upload a smaller file or paste a link instead.` },
      { status: 400 },
    );
  }

  const parsed = ApplySchema.safeParse({
    roleSlug: formData.get("roleSlug"),
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    cur_sal: formData.get("cur_sal"),
    exp_sal: formData.get("exp_sal"),
    notice: formData.get("notice"),
    resume_link: formData.get("resume_link"),
    portfolio: formData.get("portfolio"),
    social: formData.get("social"),
    samples: formData.get("samples"),
    experience: formData.get("experience"),
    employment_type: formData.get("employment_type"),
    content_types: formData.get("content_types") ?? "[]",
    video_tools: formData.get("video_tools") ?? "[]",
    video_other: formData.get("video_other"),
    photo_tools: formData.get("photo_tools") ?? "[]",
    photo_other: formData.get("photo_other"),
    ai_tools: formData.get("ai_tools") ?? "[]",
    ai_other: formData.get("ai_other"),
    proud: formData.get("proud"),
    source: formData.get("source"),
  });

  if (!parsed.success) {
    return Response.json(
      { success: false, message: "Please fill in all required fields correctly." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  await connectDB();
  const { getRoleBySlug } = await import("@/lib/roles");
  const role = await getRoleBySlug(data.roleSlug);
  if (!role) {
    return Response.json({ success: false, message: "That role could not be found." }, { status: 400 });
  }

  // Resume: try a Blob upload if a file was attached and configured; a
  // Blob failure (or no token yet) must never abort the submission — fall
  // back to the pasted link, or "none".
  const flags: string[] = [];
  let resume: {
    source: "upload" | "link" | "none";
    blobUrl?: string;
    fileName?: string;
    mimeType?: string;
    size?: number;
    pastedLink?: string;
  } = data.resume_link ? { source: "link", pastedLink: data.resume_link } : { source: "none" };

  if (resumeFile instanceof File && resumeFile.size > 0) {
    try {
      const uploaded = await uploadResumeIfConfigured(resumeFile, data.name);
      if (uploaded) {
        resume = { source: "upload", ...uploaded };
      } else if (data.resume_link) {
        flags.push("blob_not_configured");
      }
    } catch (err) {
      if (err instanceof ResumeTooLargeError) {
        return Response.json(
          { success: false, message: `Resume file exceeds the ${MAX_RESUME_SIZE_LABEL} limit. Please upload a smaller file or paste a link instead.` },
          { status: 400 },
        );
      }
      console.error("Blob upload failed:", err);
      flags.push("resume_upload_failed");
      if (!data.resume_link) resume = { source: "none" };
    }
  }

  const applicationDoc = {
    roleSlug: role.slug,
    roleTitle: role.title,
    applicant: { name: data.name, phone: data.phone, email: data.email, city: data.city || undefined },
    compensation: {
      currentSalary: data.cur_sal,
      expectedSalary: data.exp_sal,
      noticePeriod: data.notice || undefined,
      workMode: "On-site (Gurugram)",
    },
    resume,
    portfolio: {
      portfolioLink: data.portfolio || undefined,
      socialLink: data.social || undefined,
      sampleLinks: data.samples || undefined,
    },
    experience: {
      yearsOfExperience: data.experience,
      employmentTypeSought: data.employment_type || undefined,
      contentTypes: data.content_types,
    },
    tools: {
      video: data.video_tools,
      photo: data.photo_tools,
      ai: data.ai_tools,
    },
    otherVideoTools: data.video_other || undefined,
    otherPhotoTools: data.photo_other || undefined,
    otherAiTools: data.ai_other || undefined,
    proudVideo: data.proud || undefined,
    howHeard: data.source || undefined,
    flags,
  };

  let applicationId: string;
  try {
    const created = await ApplicationModel.create(applicationDoc);
    applicationId = String(created._id);
  } catch (err) {
    console.error("Failed to save application:", err);
    if (resume.source === "upload" && resume.blobUrl) {
      await deleteResumeFile(resume.blobUrl).catch((cleanupErr) =>
        console.error(`Orphaned Blob file ${resume.blobUrl} could not be cleaned up:`, cleanupErr),
      );
    }
    return Response.json(
      { success: false, message: `Something went wrong. Please try again or email us at ${siteConfig.email}` },
      { status: 500 },
    );
  }

  after(() => sendNotificationEmail(data.name, role.title, data.email));

  return Response.json({ success: true, applicationId });
}
