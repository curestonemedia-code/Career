import { redirect } from "next/navigation";

// There's no single generic "apply" page anymore — each role has its own
// dedicated /apply/[slug] flow (see that route). Visits to the bare /apply
// URL (old links, bookmarks) land on the role listing to pick one from.
export default function ApplyIndexPage() {
  redirect("/#positions");
}
