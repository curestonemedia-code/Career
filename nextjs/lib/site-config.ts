// Central place for every piece of business data the site needs —
// page copy, contact details, and SEO/JSON-LD schemas all read from here
// so they can never drift out of sync with each other.

export const siteConfig = {
  name: "Cure Stone",
  legalName: "Cure Stone LLP",
  shortDescription:
    "Gurugram's leading destination for advanced kidney stone laser treatment, and a healthcare media brand educating millions on kidney health.",
  // TODO: replace with the live production domain before deploying.
  url: "https://careers.thecurestone.com",
  email: "gulshan@thecurestone.com",
  logo: "/logo.png",
  addressLines: {
    street: "Plot No. 164P & 165P, Sector 52, Near Plot 3, Rd No D-13 A, Ardee City",
    locality: "Gurugram",
    region: "Haryana",
    postalCode: "122003",
    country: "IN",
  },
  founder: {
    name: "Dr. Deepanshu Gupta",
    title: "Founder & Medical Director, Cure Stone",
    email: "deepanshu@thecurestone.com",
  },
  social: {
    youtube: "https://www.youtube.com/@cure_stone",
    instagram: "https://www.instagram.com/the_cure_stone/",
    facebook: "https://www.facebook.com/curestone",
  },
  // Clinical stats, sourced from the main practice site (thecurestone.com).
  stats: {
    surgeries: "9,000+",
    patientsTreated: "30,000+",
    successRate: "98%",
    yearsExperience: "15+ yrs",
  },
} as const;

export type SiteConfig = typeof siteConfig;
