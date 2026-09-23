"use client";

import { useActionState } from "react";
import { updateApplication } from "../actions";

const statusOptions = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;

export function StatusForm({ id, status, notes }: { id: string; status: string; notes: string }) {
  const [state, formAction, pending] = useActionState(updateApplication, undefined);

  return (
    <form action={formAction} className="rounded-2xl border border-line bg-white p-6">
      <input type="hidden" name="id" value={id} />
      <div className="mb-4">
        <label className="mb-1.5 block text-[13px] font-medium text-ink-2">Status</label>
        <select
          name="status"
          defaultValue={status}
          className="w-full rounded-[7px] border border-line-2 px-3.25 py-2.5 text-sm capitalize"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="mb-1.5 block text-[13px] font-medium text-ink-2">Internal notes</label>
        <textarea
          name="notes"
          defaultValue={notes}
          className="min-h-27.5 w-full resize-y rounded-[7px] border border-line-2 px-3.25 py-2.5 text-sm leading-relaxed"
        />
      </div>

      {state?.success && <p className="mb-3 text-xs font-bold text-[#15803d]">Saved.</p>}
      {state?.error && <p className="mb-3 text-xs font-bold text-[#991b1b]">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-blue py-3 text-sm font-bold text-white transition-colors hover:bg-blue-dark disabled:opacity-65"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
