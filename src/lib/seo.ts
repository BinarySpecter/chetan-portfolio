import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadataBase = new URL(site.url);

const title = `${site.name} — Software, AI & building`;

export function buildMetadata(): Metadata {
  return {
    metadataBase,
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    applicationName: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      firstName: site.firstName,
      lastName: site.lastName,
      title,
      description: site.description,
      url: site.url,
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      creator: "@your-handle",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    jobTitle: "Software Engineering Student",
    description: site.description,
    url: site.url,
    nationality: "Indian",
    homeLocation: { "@type": "Place", name: site.location },
    alumniOf: { "@type": "CollegeOrUniversity", name: site.school },
    knowsAbout: [
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Web Development",
      "Developer Tools",
      "Large Language Models",
      "Automation",
    ],
    sameAs: site.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  };
}
