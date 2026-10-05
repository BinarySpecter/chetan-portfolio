export type LinkItem = {
  label: string;
  href: string;
  handle?: string;
  external?: boolean;
};

export type SiteConfig = {
  name: string;
  firstName: string;
  lastName: string;
  url: string;
  eyebrow: string;
  role: string;
  statement: string;
  location: string;
  degree: string;
  school: string;
  year: string;
  email: string;
  github: string;
  x: string;
  status: {
    label: string;
    live: boolean;
  };
  description: string;
  keywords: string[];
  socials: LinkItem[];
};

export type Stat = {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
};

export type ActivityItem = {
  date: string;
  label: string;
  href?: string;
};

export type CurrentItem = {
  label: string;
  value: string;
};

export type NowItem = {
  label: string;
  value: string;
  meta?: string;
};

export type WorkEntry = {
  org: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  points?: string[];
  stack?: string[];
  url?: string;
};

export type ProjectStatus = "in-progress" | "shipped" | "exploring" | "archived";

export type Project = {
  slug: string;
  name: string;
  alias?: string;
  year: string;
  tagline: string;
  status: ProjectStatus;
  why?: string;
  whatItDoes?: string;
  howItWorks?: string;
  technicalDecisions?: string;
  challenges?: string;
  learned?: string;
  outcome?: string;
  stack: string[];
  github?: string;
  live?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  screenshot?: string;
  screenshotAlt?: string;
};

export type ContributionStatus = "merged" | "open" | "closed" | "draft";

export type ContributionKind = "pull-request" | "review" | "issue" | "commit";

export type ContributionStatusLabel =
  | "merged"
  | "opened"
  | "reviewed"
  | "commented"
  | "committed"
  | "updated";

export type ContributionEvent = {
  type: ContributionStatusLabel;
  date: string;
  title?: string;
  description?: string;
  url?: string;
};

export type Contribution = {
  id: string;
  kind: ContributionKind;
  title: string;
  number?: number;
  status: ContributionStatus;
  description: string;
  url: string;
  openedAt?: string;
  mergedAt?: string;
  additions?: number;
  deletions?: number;
  changedFiles?: number;
  events?: ContributionEvent[];
};

export type OpenSourceRepository = {
  repo: string;
  owner: string;
  name: string;
  repoUrl: string;
  description: string;
  language: string;
  stars: number;
  avatarUrl: string;
  role: string;
  contributions: Contribution[];
};

export type BuildLogEntry = {
  date: string;
  title: string;
  body?: string;
  tags?: string[];
  repo?: string;
  href?: string;
};

export type Experiment = {
  name: string;
  category: string;
  summary: string;
  status?: string;
  href?: string;
};

export type NoteStatus = "published" | "draft" | "planned";

export type Note = {
  title: string;
  description: string;
  status: NoteStatus;
  topic?: string;
  href?: string;
};

export type PersonalItem = {
  label: string;
  value: string;
};

export type NavItem = {
  label: string;
  href: string;
};
