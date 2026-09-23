import { RoleForm } from "../RoleForm";

export const metadata = { title: "New Job | Admin" };

export default function NewJobPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-black text-ink">New job</h1>
      <RoleForm />
    </div>
  );
}
