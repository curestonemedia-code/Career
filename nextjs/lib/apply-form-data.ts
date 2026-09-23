export type ToolOption = { id: string; name: string; tag: string };

// Which skill-specific sections a role's apply form shows — set per role
// from the admin job form, read by ApplyForm to render only what's
// relevant (an SEO intern shouldn't see "video editing software").
export type SkillSection = "video" | "photo" | "ai" | "seo";

export const skillSectionOptions: { id: SkillSection; label: string }[] = [
  { id: "video", label: "Video editing tools" },
  { id: "photo", label: "Photo / camera editing tools" },
  { id: "ai", label: "AI video generation tools" },
  { id: "seo", label: "SEO tools" },
];

export const contentTypes: ToolOption[] = [
  { id: "reels", name: "Reels / Shorts", tag: "Social media" },
  { id: "youtube", name: "YouTube long-form", tag: "10+ min videos" },
  { id: "medical", name: "Medical / Healthcare", tag: "Clinic, hospital" },
  { id: "corporate", name: "Corporate / Brand", tag: "Ads, promos" },
  { id: "motion", name: "Motion graphics", tag: "AE, animations" },
  { id: "thumbnail", name: "Thumbnail design", tag: "YouTube, social" },
];

export const videoTools: ToolOption[] = [
  { id: "premiere", name: "Premiere Pro", tag: "Adobe" },
  { id: "ae", name: "After Effects", tag: "Adobe" },
  { id: "fcp", name: "Final Cut Pro", tag: "Apple" },
  { id: "capcut", name: "CapCut", tag: "Desktop / Mobile" },
  { id: "filmora", name: "Filmora", tag: "Wondershare" },
  { id: "imovie", name: "iMovie", tag: "Apple" },
];

export const photoTools: ToolOption[] = [
  { id: "photoshop", name: "Photoshop", tag: "Adobe" },
  { id: "lightroom", name: "Lightroom", tag: "Adobe" },
  { id: "canva", name: "Canva", tag: "Web / Design" },
  { id: "illustrator", name: "Illustrator", tag: "Adobe" },
  { id: "snapseed", name: "Snapseed", tag: "Mobile" },
  { id: "pixlr", name: "Pixlr", tag: "Web / App" },
];

export const aiTools: ToolOption[] = [
  { id: "flow", name: "Flow", tag: "Google" },
  { id: "sora", name: "Sora", tag: "OpenAI" },
  { id: "runway", name: "Runway ML", tag: "Gen-3, video FX" },
  { id: "pika", name: "Pika Labs", tag: "AI video gen" },
  { id: "heygen", name: "HeyGen", tag: "AI avatars" },
  { id: "descript", name: "Descript", tag: "AI edit + transcript" },
  { id: "invideo", name: "InVideo AI", tag: "Script to video" },
  { id: "luma", name: "Luma Dream Machine", tag: "AI video gen" },
  { id: "elevenlabs", name: "ElevenLabs", tag: "AI voiceover" },
  { id: "capcutai", name: "CapCut AI", tag: "AI features" },
];

export const seoTools: ToolOption[] = [
  { id: "gsc", name: "Google Search Console", tag: "Search performance" },
  { id: "ga4", name: "Google Analytics (GA4)", tag: "Traffic & behaviour" },
  { id: "ahrefs", name: "Ahrefs", tag: "Backlinks & keywords" },
  { id: "semrush", name: "SEMrush", tag: "Keyword research" },
  { id: "ubersuggest", name: "Ubersuggest", tag: "Keyword research" },
  { id: "screamingfrog", name: "Screaming Frog", tag: "Technical SEO" },
  { id: "gkp", name: "Google Keyword Planner", tag: "Keyword research" },
  { id: "surfer", name: "Surfer SEO", tag: "Content optimisation" },
];

export const proficiency4 = ["Basic", "Intermediate", "Advanced", "Expert"];
export const proficiency3 = ["Basic", "Intermediate", "Advanced"];

export const noticeOptions = [
  "Immediately",
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "More than 1 month",
];

export const experienceOptions = [
  "Less than 1 year (fresher)",
  "1-2 years",
  "2-4 years",
  "4-6 years",
  "6+ years",
];

export const employmentTypeOptions = ["Full-time", "Part-time", "Freelance / Contract", "Internship"];

export const sourceOptions = [
  "LinkedIn",
  "Instagram",
  "WhatsApp",
  "Internshala",
  "Naukri",
  "Referral",
  "Other",
];
