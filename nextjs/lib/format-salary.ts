// A pure formatting helper, deliberately kept out of lib/roles.ts: that
// module imports Mongoose (via lib/db/connect.ts), so any Client Component
// importing even a single value from it would pull the whole DB layer into
// the browser bundle. This file has no such imports and is safe everywhere.

export function formatSalary(role: {
  salaryDisclosed: boolean;
  salary: { min: number; max: number };
}): string {
  if (!role.salaryDisclosed) return "Compensation discussed personally";
  return `₹${role.salary.min.toLocaleString("en-IN")} - ₹${role.salary.max.toLocaleString("en-IN")}`;
}
