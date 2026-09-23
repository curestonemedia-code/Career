"use client";

import {
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  UploadSimpleIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { type FormEvent, useRef, useState } from "react";
import {
  type ToolOption,
  aiTools,
  contentTypes,
  employmentTypeOptions,
  experienceOptions,
  noticeOptions,
  photoTools,
  proficiency3,
  proficiency4,
  seoTools,
  sourceOptions,
  videoTools,
} from "@/lib/apply-form-data";
import { getRoleIcon } from "@/lib/role-icons";
import { formatSalary } from "@/lib/format-salary";
import { ACCEPTED_RESUME_EXTENSIONS, MAX_RESUME_SIZE_BYTES, MAX_RESUME_SIZE_LABEL } from "@/lib/resume-constraints";
import type { Role } from "@/lib/roles";
import { siteConfig } from "@/lib/site-config";

const REQUIRED_FIELDS_MESSAGE = "Please fill all fields marked with * to continue.";

function CheckDot({ on }: { on: boolean }) {
  return (
    <div
      className={`absolute top-3 right-3 flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
        on ? "border-blue bg-blue" : "hidden"
      }`}
    >
      <CheckIcon size={9} weight="bold" className="text-white" />
    </div>
  );
}

function RoleRow({
  icon,
  title,
  schedule,
  salary,
  selected,
  onSelect,
}: {
  icon: string;
  title: string;
  schedule: string;
  salary: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = getRoleIcon(icon);
  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        onSelect();
      }}
      className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border p-4 pr-9 transition-colors select-none ${
        selected ? "border-blue bg-blue-light" : "border-line-2 bg-white hover:border-blue-mid"
      }`}
    >
      <input type="radio" checked={selected} readOnly className="sr-only" />
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-white" : "bg-blue-light"}`}
      >
        {/* getRoleIcon always returns a stable reference from the fixed icon registry, never a newly-created component. */}
        {/* eslint-disable-next-line react-hooks/static-components */}
        <Icon size={17} weight="regular" className="text-blue" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-ink">{title}</div>
        <div className="mt-0.5 text-xs text-ink-2">{schedule}</div>
        <div className="mt-1 text-xs font-bold text-blue">{salary} / mo</div>
      </div>
      <CheckDot on={selected} />
    </label>
  );
}

function SimpleChip({
  option,
  selected,
  onToggle,
}: {
  option: ToolOption;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      className={`relative cursor-pointer rounded-[7px] border p-2.75 px-3.25 transition-colors select-none ${
        selected ? "border-blue bg-blue-light" : "border-line bg-white hover:border-blue-mid"
      }`}
    >
      <input type="checkbox" checked={selected} readOnly className="sr-only" />
      <CheckDot on={selected} />
      <div className="text-[13px] font-medium text-ink">{option.name}</div>
      <div className="mt-0.5 text-[11px] text-ink-3">{option.tag}</div>
    </label>
  );
}

function ProficiencyChip({
  option,
  proficiency,
  levels,
  onToggle,
  onProficiencyChange,
}: {
  option: ToolOption;
  proficiency: string | null;
  levels: string[];
  onToggle: () => void;
  onProficiencyChange: (level: string) => void;
}) {
  const selected = proficiency !== null;
  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      className={`relative cursor-pointer rounded-[7px] border p-2.75 px-3.25 transition-colors select-none ${
        selected ? "border-blue bg-blue-light" : "border-line bg-white hover:border-blue-mid"
      }`}
    >
      <input type="checkbox" checked={selected} readOnly className="sr-only" />
      <CheckDot on={selected} />
      <div className="text-[13px] font-medium text-ink">{option.name}</div>
      <div className="mt-0.5 text-[11px] text-ink-3">{option.tag}</div>
      {selected && (
        <div className="mt-2">
          <select
            value={proficiency ?? levels[0]}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onProficiencyChange(e.target.value)}
            className="w-full rounded-md border border-line-2 bg-white bg-[length:10px] bg-[right_8px_center] bg-no-repeat py-1.5 pr-7 pl-2.5 text-xs text-ink-2 focus:border-blue focus:outline-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
            }}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      )}
    </label>
  );
}

const inputClasses =
  "w-full rounded-[7px] border border-line-2 bg-white px-3.25 py-2.5 text-sm text-ink transition-shadow focus:border-blue focus:shadow-[0_0_0_3px_rgba(43,92,230,.1)] focus:outline-none";
const labelClasses = "mb-1.5 block text-[13px] font-medium text-ink-2";
const cardClasses = "mb-4 rounded-[14px] border border-line bg-white p-7";
const sectionLabelClasses =
  "mb-4.5 border-b border-line pb-2 text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase";

export function ApplyForm({ roles, initialRoleSlug }: { roles: Role[]; initialRoleSlug?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [selectedRoleSlug, setSelectedRoleSlug] = useState<string>(initialRoleSlug ?? "");
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [selectedContentTypes, setSelectedContentTypes] = useState<Set<string>>(new Set());
  const [videoToolProficiency, setVideoToolProficiency] = useState<Record<string, string>>({});
  const [photoToolProficiency, setPhotoToolProficiency] = useState<Record<string, string>>({});
  const [aiToolProficiency, setAiToolProficiency] = useState<Record<string, string>>({});
  const [seoToolProficiency, setSeoToolProficiency] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleContentType(id: string) {
    setSelectedContentTypes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleTool(
    id: string,
    defaultLevel: string,
    state: Record<string, string>,
    setState: (v: Record<string, string>) => void,
  ) {
    const next = { ...state };
    if (id in next) delete next[id];
    else next[id] = defaultLevel;
    setState(next);
  }

  function toolsForSubmit(options: ToolOption[], proficiency: Record<string, string>) {
    return options
      .filter((o) => o.id in proficiency)
      .map((o) => ({ name: o.name, proficiency: proficiency[o.id] }));
  }

  function contentTypeNames() {
    return contentTypes.filter((c) => selectedContentTypes.has(c.id)).map((c) => c.name);
  }

  const selectedRole = roles.find((r) => r.slug === selectedRoleSlug);
  const skillSections = selectedRole?.skillSections ?? [];
  const showVideo = skillSections.includes("video");
  const showPhoto = skillSections.includes("photo");
  const showAi = skillSections.includes("ai");
  const showSeo = skillSections.includes("seo");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const curSal = String(fd.get("cur_sal") ?? "").trim();
    const expSal = String(fd.get("exp_sal") ?? "").trim();
    const experience = String(fd.get("experience") ?? "").trim();
    const role = selectedRole;

    // Every field marked with * across the form, checked together so a
    // single missing field anywhere shows the same generic message below
    // rather than pointing at (or highlighting) any one field.
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const curSalValid = curSal !== "" && Number.isFinite(Number(curSal)) && Number(curSal) >= 0;
    const expSalValid = expSal !== "" && Number.isFinite(Number(expSal)) && Number(expSal) >= 0;
    const phoneValid = phone.replace(/[^\d]/g, "").length >= 7;

    const resumeFile = resumeInputRef.current?.files?.[0];
    if (resumeFile && resumeFile.size > MAX_RESUME_SIZE_BYTES) {
      setError(`Resume file exceeds the ${MAX_RESUME_SIZE_LABEL} limit. Please choose a smaller file or paste a link instead.`);
      return;
    }

    if (!role || !name || !phone || !phoneValid || !email || !emailValid || !curSalValid || !expSalValid || !experience) {
      setError(REQUIRED_FIELDS_MESSAGE);
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = new FormData();
    payload.append("roleSlug", role.slug);
    payload.append("name", name);
    payload.append("phone", phone);
    payload.append("email", email);
    payload.append("city", String(fd.get("city") ?? "").trim());

    payload.append("cur_sal", curSal);
    payload.append("exp_sal", expSal);
    payload.append("notice", String(fd.get("notice") ?? ""));

    if (resumeFile) payload.append("resume", resumeFile, resumeFile.name);
    payload.append("resume_link", String(fd.get("resume_link") ?? "").trim());

    payload.append("portfolio", String(fd.get("portfolio") ?? "").trim());
    payload.append("social", String(fd.get("social") ?? "").trim());
    payload.append("samples", String(fd.get("samples") ?? "").trim());

    payload.append("experience", experience);
    payload.append("employment_type", String(fd.get("employment_type") ?? ""));
    payload.append("content_types", JSON.stringify(contentTypeNames()));

    payload.append("video_tools", JSON.stringify(toolsForSubmit(videoTools, videoToolProficiency)));
    payload.append("video_other", String(fd.get("video_other") ?? "").trim());
    payload.append("photo_tools", JSON.stringify(toolsForSubmit(photoTools, photoToolProficiency)));
    payload.append("photo_other", String(fd.get("photo_other") ?? "").trim());
    payload.append("ai_tools", JSON.stringify(toolsForSubmit(aiTools, aiToolProficiency)));
    payload.append("ai_other", String(fd.get("ai_other") ?? "").trim());
    payload.append("seo_tools", JSON.stringify(toolsForSubmit(seoTools, seoToolProficiency)));
    payload.append("seo_other", String(fd.get("seo_other") ?? "").trim());

    payload.append("proud", String(fd.get("proud") ?? "").trim());
    payload.append("source", String(fd.get("source") ?? ""));

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(data.message || JSON.stringify(data));
      }
    } catch (err) {
      setError(
        `Error: ${err instanceof Error ? err.message : "Unknown error"}. Please try again or email us at ${siteConfig.email}`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-[14px] border border-[#86efac] bg-[#f0fdf4] p-10 px-8 text-center">
        <CheckCircleIcon size={52} weight="light" className="mx-auto mb-4 text-[#166534]" />
        <h3 className="mb-2 text-xl font-semibold text-[#166534]">Application received!</h3>
        <p className="text-sm text-[#166534]/80">
          Thank you for applying to Cure Stone. We&apos;ll review your profile and get back to you
          within 3 to 5 business days.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      {/* Main fields */}
      <div className="order-2 lg:order-1">
        {/* Personal details */}
        <div className={cardClasses}>
          <div className={sectionLabelClasses}>Personal details</div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>
                Full name <span className="text-[#ef4444]">*</span>
              </label>
              <input name="name" type="text" placeholder="Your full name" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>
                Phone number <span className="text-[#ef4444]">*</span>
              </label>
              <input name="phone" type="tel" placeholder="+91 98765 43210" className={inputClasses} />
            </div>
          </div>
          <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>
                Email address <span className="text-[#ef4444]">*</span>
              </label>
              <input name="email" type="email" placeholder="you@email.com" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>City / Location</label>
              <input name="city" type="text" placeholder="e.g. Gurugram, Delhi" className={inputClasses} />
            </div>
          </div>
        </div>

        {/* Compensation */}
        <div className={cardClasses}>
          <div className={sectionLabelClasses}>Compensation</div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>
                Current salary (monthly) <span className="text-[#ef4444]">*</span>
              </label>
              <div className="grid grid-cols-[76px_1fr] items-center gap-2">
                <div className="rounded-[7px] border border-line-2 bg-surface py-2.5 text-center text-xs font-medium text-ink-2">
                  ₹ / mo
                </div>
                <input name="cur_sal" type="number" min={0} placeholder="e.g. 25000" className={inputClasses} />
              </div>
              <div className="mt-1.25 text-xs text-ink-3">Enter 0 if fresher or intern</div>
            </div>
            <div>
              <label className={labelClasses}>
                Expected salary (monthly) <span className="text-[#ef4444]">*</span>
              </label>
              <div className="grid grid-cols-[76px_1fr] items-center gap-2">
                <div className="rounded-[7px] border border-line-2 bg-surface py-2.5 text-center text-xs font-medium text-ink-2">
                  ₹ / mo
                </div>
                <input name="exp_sal" type="number" min={0} placeholder="e.g. 35000" className={inputClasses} />
              </div>
            </div>
          </div>
          <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>Availability to join</label>
              <select name="notice" defaultValue="" className={inputClasses}>
                <option value="">Select</option>
                {noticeOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Work mode</label>
              <input
                type="text"
                value="On-site (Gurugram)"
                readOnly
                className={`${inputClasses} cursor-default bg-surface text-ink-2`}
              />
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className={cardClasses}>
          <div className={sectionLabelClasses}>Resume / CV</div>
          <div className="relative rounded-[10px] border-[1.5px] border-dashed border-line-2 bg-surface p-7 px-5 text-center transition-colors hover:border-blue hover:bg-blue-light">
            <input
              ref={resumeInputRef}
              type="file"
              accept={ACCEPTED_RESUME_EXTENSIONS.join(",")}
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > MAX_RESUME_SIZE_BYTES) {
                  setError(
                    `"${file.name}" is too large. The resume limit is ${MAX_RESUME_SIZE_LABEL} — please choose a smaller file or paste a link below.`,
                  );
                  e.target.value = "";
                  setResumeFileName(null);
                  return;
                }
                setError(null);
                setResumeFileName(file ? file.name : null);
              }}
            />
            <UploadSimpleIcon size={32} weight="light" className="mx-auto mb-2.5 text-blue" />
            <div className="mb-1 text-sm font-medium">Click or drag to upload your resume</div>
            <div className="text-xs text-ink-3">PDF, DOC, or DOCX · Max {MAX_RESUME_SIZE_LABEL}</div>
          </div>
          {resumeFileName && (
            <div className="mt-2.5 flex items-center gap-2.5 rounded-[7px] border border-[#86efac] bg-[#f0fdf4] px-3.5 py-2.5">
              <CheckIcon size={18} weight="bold" className="shrink-0 text-[#166534]" />
              <span className="text-[13px] font-medium text-[#166534]">{resumeFileName} uploaded</span>
            </div>
          )}
          <div className="mt-2 text-xs text-ink-3">Or paste a Google Drive / Dropbox link below</div>
          <input
            name="resume_link"
            type="url"
            placeholder="https://drive.google.com/..."
            className={`${inputClasses} mt-2`}
          />
        </div>

        {/* Portfolio */}
        <div className={cardClasses}>
          <div className={sectionLabelClasses}>Portfolio</div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>Portfolio / Drive link</label>
              <input name="portfolio" type="url" placeholder="Google Drive, Behance..." className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Instagram / YouTube channel</label>
              <input
                name="social"
                type="url"
                placeholder="https://www.instagram.com/..."
                className={inputClasses}
              />
            </div>
          </div>
          <div className="mt-3.5">
            <label className={labelClasses}>2-3 best work sample links</label>
            <textarea
              name="samples"
              placeholder="Paste video links, one per line. Reels, Shorts, YouTube..."
              className={`${inputClasses} min-h-22.5 resize-y leading-relaxed`}
            />
          </div>
        </div>

        {/* Experience */}
        <div className={cardClasses}>
          <div className={sectionLabelClasses}>Experience</div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div>
              <label className={labelClasses}>
                Years of relevant experience <span className="text-[#ef4444]">*</span>
              </label>
              <select name="experience" defaultValue="" className={inputClasses}>
                <option value="">Select</option>
                {experienceOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Employment type sought</label>
              <select name="employment_type" defaultValue="" className={inputClasses}>
                <option value="">Select</option>
                {employmentTypeOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          {showVideo && (
            <div className="mt-3.5">
              <label className={labelClasses}>Content types edited (select all that apply)</label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {contentTypes.map((option) => (
                  <SimpleChip
                    key={option.id}
                    option={option}
                    selected={selectedContentTypes.has(option.id)}
                    onToggle={() => toggleContentType(option.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video editing software */}
        {showVideo && (
          <div className={cardClasses}>
            <div className={sectionLabelClasses}>Video editing software</div>
            <p className="mb-3.5 text-[13px] text-ink-2">Select tools you use and choose your proficiency level.</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {videoTools.map((option) => (
                <ProficiencyChip
                  key={option.id}
                  option={option}
                  levels={proficiency4}
                  proficiency={videoToolProficiency[option.id] ?? null}
                  onToggle={() =>
                    toggleTool(option.id, proficiency4[0], videoToolProficiency, setVideoToolProficiency)
                  }
                  onProficiencyChange={(level) =>
                    setVideoToolProficiency((prev) => ({ ...prev, [option.id]: level }))
                  }
                />
              ))}
            </div>
            <div className="mt-3.5">
              <label className={labelClasses}>Other video editing tools</label>
              <input
                name="video_other"
                type="text"
                placeholder="e.g. Kdenlive, Resolve Fusion, Premiere Rush..."
                className={inputClasses}
              />
            </div>
          </div>
        )}

        {/* Photo editing software */}
        {showPhoto && (
          <div className={cardClasses}>
            <div className={sectionLabelClasses}>Photo / camera editing software</div>
            <p className="mb-3.5 text-[13px] text-ink-2">Select tools you use and choose your proficiency level.</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {photoTools.map((option) => (
                <ProficiencyChip
                  key={option.id}
                  option={option}
                  levels={proficiency4}
                  proficiency={photoToolProficiency[option.id] ?? null}
                  onToggle={() =>
                    toggleTool(option.id, proficiency4[0], photoToolProficiency, setPhotoToolProficiency)
                  }
                  onProficiencyChange={(level) =>
                    setPhotoToolProficiency((prev) => ({ ...prev, [option.id]: level }))
                  }
                />
              ))}
            </div>
            <div className="mt-3.5">
              <label className={labelClasses}>Other photo editing tools</label>
              <input
                name="photo_other"
                type="text"
                placeholder="e.g. Affinity Photo, Darkroom, Capture One..."
                className={inputClasses}
              />
            </div>
          </div>
        )}

        {/* AI tools */}
        {showAi && (
          <div className={cardClasses}>
            <div className={sectionLabelClasses}>AI video generation tools</div>
            <p className="mb-3.5 text-[13px] text-ink-2">Select all tools you have used and rate your proficiency.</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {aiTools.map((option) => (
                <ProficiencyChip
                  key={option.id}
                  option={option}
                  levels={proficiency3}
                  proficiency={aiToolProficiency[option.id] ?? null}
                  onToggle={() => toggleTool(option.id, proficiency3[0], aiToolProficiency, setAiToolProficiency)}
                  onProficiencyChange={(level) => setAiToolProficiency((prev) => ({ ...prev, [option.id]: level }))}
                />
              ))}
            </div>
            <div className="mt-3.5">
              <label className={labelClasses}>Other AI tools you use</label>
              <input
                name="ai_other"
                type="text"
                placeholder="e.g. Kaiber, Midjourney for thumbnails, Stable Diffusion..."
                className={inputClasses}
              />
            </div>
          </div>
        )}

        {/* SEO tools */}
        {showSeo && (
          <div className={cardClasses}>
            <div className={sectionLabelClasses}>SEO tools</div>
            <p className="mb-3.5 text-[13px] text-ink-2">Select all tools you have used and rate your proficiency.</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {seoTools.map((option) => (
                <ProficiencyChip
                  key={option.id}
                  option={option}
                  levels={proficiency3}
                  proficiency={seoToolProficiency[option.id] ?? null}
                  onToggle={() => toggleTool(option.id, proficiency3[0], seoToolProficiency, setSeoToolProficiency)}
                  onProficiencyChange={(level) => setSeoToolProficiency((prev) => ({ ...prev, [option.id]: level }))}
                />
              ))}
            </div>
            <div className="mt-3.5">
              <label className={labelClasses}>Other SEO tools you use</label>
              <input
                name="seo_other"
                type="text"
                placeholder="e.g. Moz, Screaming Frog, Clearscope..."
                className={inputClasses}
              />
            </div>
          </div>
        )}

        {/* Final questions */}
        <div className={cardClasses}>
          <div className={sectionLabelClasses}>Final questions</div>
          <div>
            <label className={labelClasses}>Tell us about a project you&apos;re most proud of</label>
            <textarea
              name="proud"
              placeholder="What did you make or achieve? What made it stand out?"
              className={`${inputClasses} min-h-27.5 resize-y leading-relaxed`}
            />
          </div>
          <div className="mt-3.5">
            <label className={labelClasses}>How did you hear about this opening?</label>
            <select name="source" defaultValue="" className={inputClasses}>
              <option value="">Select</option>
              {sourceOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue py-4 text-[15px] font-black tracking-wide text-white uppercase shadow-lg shadow-blue/20 transition-all hover:-translate-y-0.5 hover:bg-blue-dark disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0"
        >
          {submitting && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {submitting ? "Submitting" : "Submit application"}
        </button>

        {error && (
          <div className="mt-3 rounded-[7px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-center text-[13px] text-[#991b1b]">
            {error}
          </div>
        )}

        <p className="mt-3.5 text-center text-xs text-ink-3">
          {siteConfig.legalName} · {siteConfig.addressLines.street}, {siteConfig.addressLines.locality},{" "}
          {siteConfig.addressLines.region} {siteConfig.addressLines.postalCode}
        </p>
      </div>

      {/* Sticky sidebar: role picker + trust info */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-28">
          <div className="rounded-[14px] border border-line bg-white p-6">
            <div className={sectionLabelClasses}>
              Applying for <span className="text-[#ef4444]">*</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {roles.map((role) => (
                <RoleRow
                  key={role.slug}
                  icon={role.icon}
                  title={role.title}
                  schedule={role.schedule}
                  salary={formatSalary(role)}
                  selected={selectedRoleSlug === role.slug}
                  onSelect={() => setSelectedRoleSlug(role.slug)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-[14px] border border-line bg-surface p-6">
            <p className="mb-4 text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase">
              Why candidates join
            </p>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-2.5 text-[13px] text-ink-2">
                <UsersThreeIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-blue" />
                Direct mentorship from Dr. Deepanshu Gupta
              </li>
              <li className="flex items-start gap-2.5 text-[13px] text-ink-2">
                <ClockIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-blue" />
                We reply within 3 to 5 business days
              </li>
              <li className="flex items-start gap-2.5 text-[13px] text-ink-2">
                <EnvelopeIcon size={16} weight="bold" className="mt-0.5 shrink-0 text-blue" />
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-blue hover:underline">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
