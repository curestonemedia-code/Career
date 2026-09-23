"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifySession } from "@/lib/auth/dal";
import { connectDB } from "@/lib/db/connect";
import { ApplicationModel } from "@/lib/db/models/Application";

const UpdateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "reviewing", "shortlisted", "rejected", "hired"]),
  notes: z.string(),
});

export type UpdateApplicationState = { error?: string; success?: boolean } | undefined;

export async function updateApplication(
  _prevState: UpdateApplicationState,
  formData: FormData,
): Promise<UpdateApplicationState> {
  await verifySession();

  const parsed = UpdateSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? "",
  });

  if (!parsed.success) {
    return { error: "Could not save. Please try again." };
  }

  await connectDB();
  await ApplicationModel.updateOne(
    { _id: parsed.data.id },
    { $set: { status: parsed.data.status, notes: parsed.data.notes } },
  );

  revalidatePath(`/admin/applications/${parsed.data.id}`);
  revalidatePath("/admin/applications");
  revalidatePath("/admin");

  return { success: true };
}
