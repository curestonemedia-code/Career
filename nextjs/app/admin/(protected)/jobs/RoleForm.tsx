"use client";

import { PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useActionState, useState } from "react";
import { saveRole } from "./actions";
import { roleIconRegistry, roleIconKeys } from "@/lib/role-icons";
import { type SkillSection, skillSectionOptions } from "@/lib/apply-form-data";
import type { Role } from "@/lib/roles";

const inputClasses =
  "w-full rounded-[7px] border border-line-2 bg-white px-3.25 py-2.5 text-sm text-ink transition-shadow focus:border-blue focus:shadow-[0_0_0_3px_rgba(43,92,230,.1)] focus:outline-none";
const labelClasses = "mb-1.5 block text-[13px] font-medium text-ink-2";
const cardClasses = "mb-4 rounded-[14px] border border-line bg-white p-7";
const sectionLabelClasses =
  "mb-4.5 border-b border-line pb-2 text-[11px] font-semibold tracking-[0.08em] text-ink-3 uppercase";

function fieldError(fieldErrors: Record<string, string> | undefined, key: string) {
  if (!fieldErrors?.[key]) return null;
  return <p className="mt-1 text-xs text-[#dc2626]">{fieldErrors[key]}</p>;
}

function ListEditor({
  name,
  label,
  items,
  setItems,
}: {
  name: string;
  label: string;
  items: string[];
  setItems: (items: string[]) => void;
}) {
  return (
    <div>
      <label className={labelClasses}>{label}</label>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              name={name}
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                setItems(next);
              }}
              className={inputClasses}
            />
            <button
              type="button"
              onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[7px] border border-line-2 text-ink-3 transition-colors hover:border-[#fecaca] hover:text-[#dc2626]"
            >
              <TrashIcon size={15} weight="bold" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems([...items, ""])}
        className="mt-2 flex items-center gap-1.5 text-xs font-bold text-blue"
      >
        <PlusIcon size={13} weight="bold" />
        Add line
      </button>
    </div>
  );
}

export function RoleForm({ role }: { role?: Role }) {
  const [state, formAction, pending] = useActionState(saveRole, undefined);

  const [responsibilities, setResponsibilities] = useState<string[]>(
    role?.responsibilities && role.responsibilities.length > 0 ? role.responsibilities : [""],
  );
  const [requirements, setRequirements] = useState<string[]>(
    role?.requirements && role.requirements.length > 0 ? role.requirements : [""],
  );
  const [bonusSkills, setBonusSkills] = useState<string[]>(role?.bonusSkills ?? []);

  return (
    <form action={formAction}>
      {role && <input type="hidden" name="id" value={role.id} />}

      <div className={cardClasses}>
        <div className={sectionLabelClasses}>Basics</div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Title</label>
            <input name="title" defaultValue={role?.title} required className={inputClasses} />
            {fieldError(state?.fieldErrors, "title")}
          </div>
          <div>
            <label className={labelClasses}>Slug (leave blank to auto-generate)</label>
            <input name="slug" defaultValue={role?.slug} placeholder="video-editor" className={inputClasses} />
            {fieldError(state?.fieldErrors, "slug")}
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Tagline</label>
            <input name="tagline" defaultValue={role?.tagline} required className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Internal identifier</label>
            <input
              name="identifier"
              defaultValue={role?.identifier}
              placeholder="curestone-role-gurugram"
              required
              className={inputClasses}
            />
          </div>
        </div>
        <div className="mt-3.5">
          <label className={labelClasses}>Description</label>
          <textarea
            name="description"
            defaultValue={role?.description}
            required
            className={`${inputClasses} min-h-27.5 resize-y leading-relaxed`}
          />
        </div>
      </div>

      <div className={cardClasses}>
        <div className={sectionLabelClasses}>Details</div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          <div>
            <label className={labelClasses}>Employment type</label>
            <select name="employmentType" defaultValue={role?.employmentType ?? "FULL_TIME"} className={inputClasses}>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="INTERN">Internship</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Employment label</label>
            <input
              name="employmentLabel"
              defaultValue={role?.employmentLabel}
              placeholder="Full-time"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Schedule</label>
            <input
              name="schedule"
              defaultValue={role?.schedule}
              placeholder="6 days a week"
              required
              className={inputClasses}
            />
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          <div>
            <label className={labelClasses}>Icon</label>
            <select name="icon" defaultValue={role?.icon ?? "briefcase"} className={inputClasses}>
              {roleIconKeys.map((key) => (
                <option key={key} value={key}>
                  {roleIconRegistry[key].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Status</label>
            <select name="status" defaultValue={role?.status ?? "published"} className={inputClasses}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Minimum salary (monthly)</label>
            <input
              name="salaryMin"
              type="number"
              min={0}
              defaultValue={role?.salary.min}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Maximum salary (monthly)</label>
            <input
              name="salaryMax"
              type="number"
              min={0}
              defaultValue={role?.salary.max}
              required
              className={inputClasses}
            />
            {fieldError(state?.fieldErrors, "salaryMax")}
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Date posted</label>
            <input
              name="datePosted"
              type="date"
              defaultValue={role?.datePosted}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Valid through</label>
            <input
              name="validThrough"
              type="date"
              defaultValue={role?.validThrough}
              required
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <div className={cardClasses}>
        <div className={sectionLabelClasses}>Job description content</div>
        <div className="flex flex-col gap-6">
          <ListEditor
            name="responsibilities"
            label="Responsibilities"
            items={responsibilities}
            setItems={setResponsibilities}
          />
          {fieldError(state?.fieldErrors, "responsibilities")}
          <ListEditor name="requirements" label="Requirements" items={requirements} setItems={setRequirements} />
          {fieldError(state?.fieldErrors, "requirements")}
          <ListEditor
            name="bonusSkills"
            label="Bonus skills (optional)"
            items={bonusSkills}
            setItems={setBonusSkills}
          />
        </div>
      </div>

      <div className={cardClasses}>
        <div className={sectionLabelClasses}>Equipment callout (optional)</div>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Title</label>
            <input
              name="equipmentTitle"
              defaultValue={role?.equipment?.title}
              placeholder="What you'll shoot on"
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Body</label>
            <input name="equipmentBody" defaultValue={role?.equipment?.body} className={inputClasses} />
          </div>
        </div>
      </div>

      <div className={cardClasses}>
        <div className={sectionLabelClasses}>Apply form skills</div>
        <p className="mb-3.5 text-[13px] text-ink-2">
          Choose which skill sections show on the public apply form for this role. Leave all unchecked for a
          role with no tool-specific questions.
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {skillSectionOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-2.5 rounded-[7px] border border-line-2 px-3.25 py-2.5 text-sm text-ink transition-colors hover:border-blue-mid"
            >
              <input
                type="checkbox"
                name="skillSections"
                value={option.id}
                defaultChecked={role?.skillSections?.includes(option.id as SkillSection) ?? false}
                className="h-4 w-4 accent-blue"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {state?.error && (
        <div className="mb-4 rounded-[7px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-center text-[13px] text-[#991b1b]">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue py-4 text-[15px] font-black tracking-wide text-white uppercase shadow-lg shadow-blue/20 transition-all hover:-translate-y-0.5 hover:bg-blue-dark disabled:cursor-not-allowed disabled:opacity-65"
      >
        {pending ? "Saving..." : role ? "Save changes" : "Create job"}
      </button>
    </form>
  );
}
