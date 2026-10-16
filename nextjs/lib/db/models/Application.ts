import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ToolUsageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    proficiency: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const ResumeSchema = new Schema(
  {
    source: { type: String, enum: ["upload", "link", "none"], default: "none" },
    blobUrl: String,
    fileName: String,
    mimeType: String,
    size: Number,
    pastedLink: String,
  },
  { _id: false },
);

const ApplicationSchema = new Schema(
  {
    // Denormalized (plain strings, not a ref) so an application stays
    // meaningful even after its Role is closed or edited.
    roleSlug: { type: String, required: true, trim: true },
    roleTitle: { type: String, required: true, trim: true },

    applicant: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      city: { type: String, trim: true },
    },

    compensation: {
      // Optional: roles with salaryDisclosed: false on the Role don't ask
      // the applicant for salary expectations at all.
      currentSalary: { type: Number, min: 0 },
      expectedSalary: { type: Number, min: 0 },
      noticePeriod: { type: String, trim: true },
      workMode: { type: String, default: "On-site (Gurugram)" },
    },

    resume: { type: ResumeSchema, default: () => ({ source: "none" }) },

    portfolio: {
      portfolioLink: String,
      socialLink: String,
      sampleLinks: String,
    },

    experience: {
      yearsOfExperience: { type: String, required: true },
      employmentTypeSought: String,
      contentTypes: { type: [String], default: [] },
    },

    tools: {
      video: { type: [ToolUsageSchema], default: [] },
      photo: { type: [ToolUsageSchema], default: [] },
      ai: { type: [ToolUsageSchema], default: [] },
      seo: { type: [ToolUsageSchema], default: [] },
    },
    otherVideoTools: String,
    otherPhotoTools: String,
    otherAiTools: String,
    otherSeoTools: String,

    proudVideo: String,
    howHeard: String,

    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected", "hired"],
      default: "new",
    },
    notes: { type: String, default: "" },
    // e.g. "resume_upload_failed" — surfaces Blob hiccups to the admin
    // instead of silently swallowing them.
    flags: { type: [String], default: [] },
  },
  { timestamps: true },
);

ApplicationSchema.index({ status: 1, roleSlug: 1, createdAt: -1 });

export type ApplicationDocument = InferSchemaType<typeof ApplicationSchema>;

export const ApplicationModel =
  mongoose.models.Application ?? mongoose.model("Application", ApplicationSchema);
