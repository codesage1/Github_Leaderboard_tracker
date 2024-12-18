// Environment configuration
export const env = {
  GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN,
  GITHUB_API_URL: 'https://api.github.com',
} as const;