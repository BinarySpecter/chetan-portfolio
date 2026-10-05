export type GitHubProfile = {
  login: string;
  name: string | null;
  followers: number;
  publicRepos: number;
  avatarUrl: string;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};

export type GitHubData = {
  profile: GitHubProfile;
  repos: GitHubRepo[];
};

export async function getGitHubData(): Promise<GitHubData | null> {
  return null;
}
