export interface Developer {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
  contributions: number;
  repositories: number;
  followers: number;
  streak: number;
  skillLevel?: number;
}

export interface TimeRange {
  label: string;
  value: '7d' | '30d' | '90d' | '1y';
}

export interface LeaderboardFilters {
  timeRange: string;
  searchQuery: string;
  sortBy: 'streak' | 'contributions' | 'repositories' | 'followers';
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
}