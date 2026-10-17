export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Division {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  icon: "clapperboard" | "sparkles" | "compass" | "monitor";
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  division: string;
  year: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  videoSrc?: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  locale: string;
  email: string;
  whatsappDisplay: string;
  city: string;
  nav: NavLink[];
  socials: SocialLink[];
  divisions: Division[];
  cases: CaseStudy[];
}
