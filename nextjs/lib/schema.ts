import type { Role } from "./roles";
import { siteConfig } from "./site-config";

// Schema.org JSON-LD builders. Each function returns a plain object meant to
// be serialized into a <script type="application/ld+json"> tag.

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.shortDescription,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLines.street,
      addressLocality: siteConfig.addressLines.locality,
      addressRegion: siteConfig.addressLines.region,
      postalCode: siteConfig.addressLines.postalCode,
      addressCountry: siteConfig.addressLines.country,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
    },
    sameAs: [siteConfig.social.youtube, siteConfig.social.instagram, siteConfig.social.facebook],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} Careers`,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-IN",
  };
}

export function jobPostingSchema(role: Role) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "@id": `${siteConfig.url}/careers/${role.slug}#job`,
    title: role.title,
    description: role.description,
    identifier: {
      "@type": "PropertyValue",
      name: siteConfig.legalName,
      value: role.identifier,
    },
    datePosted: role.datePosted,
    validThrough: role.validThrough,
    employmentType: role.employmentType,
    workHours: role.schedule,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.legalName,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.addressLines.street,
        addressLocality: siteConfig.addressLines.locality,
        addressRegion: siteConfig.addressLines.region,
        postalCode: siteConfig.addressLines.postalCode,
        addressCountry: siteConfig.addressLines.country,
      },
    },
    ...(role.salaryDisclosed && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: role.salary.currency,
        value: {
          "@type": "QuantitativeValue",
          minValue: role.salary.min,
          maxValue: role.salary.max,
          unitText: role.salary.unit,
        },
      },
    }),
    directApply: true,
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    url: `${siteConfig.url}/careers/${role.slug}`,
  };
}

export function jobPostingListSchema(rolesList: Role[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: rolesList.map((role, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/careers/${role.slug}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
