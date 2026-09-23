import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { DEFAULT_ROLE_ICON_KEY, roleIconKeys } from "@/lib/role-icons";

const EquipmentSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const SalarySchema = new Schema(
  {
    currency: { type: String, required: true, enum: ["INR"], default: "INR" },
    min: { type: Number, required: true, min: 0 },
    max: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (this: { min: number }, value: number) {
          return value >= this.min;
        },
        message: "Maximum salary must be greater than or equal to minimum salary.",
      },
    },
    unit: { type: String, required: true, enum: ["MONTH"], default: "MONTH" },
  },
  { _id: false },
);

const RoleSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[a-z0-9-]+$/,
    },
    title: { type: String, required: true, trim: true },
    identifier: { type: String, required: true, trim: true },
    icon: { type: String, enum: roleIconKeys, default: DEFAULT_ROLE_ICON_KEY },
    employmentType: {
      type: String,
      required: true,
      enum: ["FULL_TIME", "PART_TIME", "INTERN"],
    },
    employmentLabel: { type: String, required: true, trim: true },
    schedule: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    datePosted: { type: Date, required: true },
    validThrough: { type: Date, required: true },
    salary: { type: SalarySchema, required: true },
    responsibilities: {
      type: [String],
      required: true,
      validate: (arr: string[]) => arr.length > 0,
    },
    requirements: {
      type: [String],
      required: true,
      validate: (arr: string[]) => arr.length > 0,
    },
    bonusSkills: { type: [String], default: undefined },
    equipment: { type: EquipmentSchema, default: undefined },
    // Which skill-specific sections the public apply form shows for this
    // role (e.g. a video editor sees video/photo/AI tool pickers, an SEO
    // intern sees SEO tools instead) — see lib/apply-form-data.ts.
    skillSections: {
      type: [String],
      enum: ["video", "photo", "ai", "seo"],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "published",
    },
  },
  { timestamps: true },
);

RoleSchema.index({ status: 1 });

export type RoleDocument = InferSchemaType<typeof RoleSchema>;

export const RoleModel = mongoose.models.Role ?? mongoose.model("Role", RoleSchema);
