import { notFound } from "next/navigation";
import { getRoleBySlug } from "@/lib/roles";
import { RoleForm } from "../../RoleForm";

export const metadata = { title: "Edit Job | Admin" };

export default async function EditJobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = await getRoleBySlug(slug);
  if (!role) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black text-ink">Edit {role.title}</h1>
      <RoleForm role={role} />
    </div>
  );
}
