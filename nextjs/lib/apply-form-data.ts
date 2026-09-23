export type ToolOption = { id: string; name: string; tag: string };

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
