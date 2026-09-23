import { About } from "@/components/About";
import { CtaSection } from "@/components/CtaSection";
import { Doctor } from "@/components/Doctor";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Perks } from "@/components/Perks";
import { Positions } from "@/components/Positions";
import { StatsStrip } from "@/components/StatsStrip";
import { Videos } from "@/components/Videos";
import { jobPostingListSchema } from "@/lib/schema";
import { getPublishedRoles } from "@/lib/roles";

export default async function Home() {
  const roles = await getPublishedRoles();

  return (
    <>
      <JsonLd data={jobPostingListSchema(roles)} />
      <Nav />
      <Hero />
      <StatsStrip />
      <About />
      <Doctor />
      <Positions />
      <Videos />
      <Perks />
      <CtaSection />
      <Footer />
    </>
  );
}
