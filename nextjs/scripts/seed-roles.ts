import "dotenv/config";
import { connectDB } from "../lib/db/connect";
import { RoleModel } from "../lib/db/models/Role";

// One-time (idempotent, upsert-by-slug) seed of the roles that used to be
// hardcoded in lib/roles.ts, so the site isn't empty the moment the static
// array is replaced by MongoDB. Safe to re-run.
const seedRoles = [
  {
    slug: "video-editor",
    title: "Video Editor",
    identifier: "curestone-video-editor-gurugram",
    icon: "video-camera",
    employmentType: "FULL_TIME",
    employmentLabel: "Full-time",
    schedule: "6 days a week",
    tagline: "Turn raw footage into videos that educate and inspire millions of viewers.",
    description:
      "Cure Stone, a fast-growing healthcare media brand in Gurugram, is hiring a full-time, on-site Video Editor to turn raw footage into YouTube videos, Instagram Reels, and YouTube Shorts that educate and inspire millions of viewers on kidney health. You will work directly with Dr. Deepanshu Gupta, Founder and Medical Director, on editing, colour grading, motion graphics, thumbnail design, and repurposing long-form content into short-form clips. It's a 6-day working week, on-site in Gurugram.",
    datePosted: new Date("2026-01-01"),
    validThrough: new Date("2026-12-31"),
    salary: { currency: "INR", min: 20000, max: 35000, unit: "MONTH" },
    responsibilities: [
      "Edit raw footage into polished YouTube videos, both short-form and long-form",
      "Create engaging Instagram Reels and YouTube Shorts",
      "Add captions, lower-thirds, motion graphics, and smooth transitions",
      "Colour grade footage and mix audio to a professional standard",
      "Design eye-catching YouTube thumbnails",
      "Collaborate directly with Dr. Deepanshu Gupta on storytelling and pacing",
      "Repurpose long videos into clips, shorts, and social snippets",
      "Maintain a consistent visual brand across YouTube, Instagram, and other platforms",
    ],
    requirements: [
      "Must have your own laptop",
      "Proficient in Premiere Pro or After Effects (or both)",
      "Strong portfolio of edited videos, Reels, YouTube, or branded content",
      "Good sense of pacing, storytelling, and visual rhythm",
      "Ability to handle medical and educational content accurately",
      "Self-organised: can manage multiple videos and deadlines simultaneously",
      "Based in or willing to relocate to Gurugram",
      "Minimum 1 year editing experience (strong fresher portfolios welcome)",
    ],
    bonusSkills: [
      "Experience with AI tools: Google Flow, CapCut AI, Runway, HeyGen, ElevenLabs, Kling AI",
      "Motion graphics or animation in After Effects",
      "Thumbnail design in Photoshop or Canva",
      "Understanding of YouTube SEO and retention optimisation",
      "Prior experience with health, wellness, or educational content",
      "Basic photography or on-set videography knowledge",
    ],
    skillSections: ["video", "photo", "ai"],
    status: "published",
  },
  {
    slug: "seo-intern",
    title: "SEO Intern",
    identifier: "curestone-seo-intern-gurugram",
    icon: "magnifying-glass",
    employmentType: "INTERN",
    employmentLabel: "Internship",
    schedule: "6 days a week",
    tagline: "Help millions of patients find Cure Stone when it matters most.",
    description:
      "Cure Stone is hiring an SEO Intern in Gurugram to support on-page optimisation, keyword research, and content audits across our website and YouTube channel. You will work alongside our content team to help more patients discover reliable kidney health information through search. This is a hands-on, learning-focused role for someone early in their SEO career, 6 days a week, on-site in Gurugram.",
    datePosted: new Date("2026-01-01"),
    validThrough: new Date("2026-12-31"),
    salary: { currency: "INR", min: 10000, max: 15000, unit: "MONTH" },
    responsibilities: [
      "Research keywords relevant to kidney health, urology, and laser treatment",
      "Audit existing pages and videos for on-page SEO opportunities",
      "Assist with metadata, titles, and descriptions across the website and YouTube",
      "Track keyword rankings and organic traffic, and report weekly findings",
      "Support basic content and backlink outreach",
      "Flag technical SEO issues (broken links, slow pages, missing alt text) to the team",
    ],
    requirements: [
      "Must have your own laptop",
      "At least some hands-on SEO experience, coursework, or a personal project counts",
      "Comfortable with spreadsheets and basic reporting",
      "Curious, detail-oriented, and comfortable researching independently",
      "Based in or willing to commute to Gurugram",
    ],
    bonusSkills: [
      "Familiarity with Google Search Console or Google Analytics",
      "Exposure to keyword tools such as Ahrefs, SEMrush, or Ubersuggest",
      "Interest in healthcare or YouTube SEO specifically",
      "Basic understanding of HTML and how search engines crawl a page",
    ],
    skillSections: ["seo"],
    status: "published",
  },
  {
    slug: "camera-operator",
    title: "Camera Operator",
    identifier: "curestone-camera-operator-gurugram",
    icon: "camera",
    employmentType: "FULL_TIME",
    employmentLabel: "Full-time",
    schedule: "6 days a week",
    tagline: "Shoot the footage that becomes Cure Stone's next video.",
    description:
      "Cure Stone is hiring a full-time, on-site Camera Operator in Gurugram to shoot clinic footage, patient education segments, and YouTube content alongside Dr. Deepanshu Gupta. You will operate a professional hybrid camera setup on location and in-studio, working closely with the editing team to plan shots that make it into the final cut. It's a 6-day working week, on-site in Gurugram.",
    datePosted: new Date("2026-01-01"),
    validThrough: new Date("2026-12-31"),
    salary: { currency: "INR", min: 25000, max: 30000, unit: "MONTH" },
    responsibilities: [
      "Operate camera during clinic shoots, patient interviews, and YouTube content sessions",
      "Set up basic lighting and audio for interview and studio setups",
      "Frame and shoot with the final edit in mind, in coordination with the video editor",
      "Maintain and care for camera bodies, lenses, and supporting gear",
      "Organise and hand off footage to the editing team after each shoot",
      "Travel locally around Gurugram and NCR for on-location shoots",
    ],
    requirements: [
      "Must have your own laptop",
      "Comfortable operating a professional hybrid camera setup",
      "Prior experience shooting video, photo, or a mix of both",
      "Understanding of basic composition, exposure, and focus",
      "Based in or willing to relocate to Gurugram",
      "Willing to travel locally for shoots",
    ],
    bonusSkills: [
      "Experience with basic lighting and on-location audio setups",
      "Comfortable directing subjects who aren't professional presenters",
      "Prior work in a clinical, corporate, or documentary setting",
    ],
    equipment: {
      title: "What you'll shoot on",
      body: "A Sony a7 IV paired with the FE 24-70mm F2.8 GM II, a professional hybrid setup with 33MP detail, fast autofocus, and a lightweight body built for full shooting days.",
    },
    skillSections: ["photo"],
    status: "published",
  },
];

async function seed() {
  await connectDB();

  for (const role of seedRoles) {
    const { slug, ...update } = role;
    await RoleModel.updateOne({ slug }, { $set: { slug, ...update } }, { upsert: true });
    console.log(`Upserted role: ${slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
