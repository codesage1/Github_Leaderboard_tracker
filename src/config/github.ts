import { env } from './env';

export const githubConfig = {
  token: env.GITHUB_TOKEN,
  apiUrl: env.GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
} as const;