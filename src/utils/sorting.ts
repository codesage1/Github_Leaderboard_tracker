import { Developer } from '../types';

export function sortDevelopers(
  developers: Developer[],
  sortBy: string
): Developer[] {
  return [...developers].sort((a, b) => {
    switch (sortBy) {
      case 'streak':
        return b.streak - a.streak;
      case 'followers':
        return b.followers - a.followers;
      case 'contributions':
        return b.contributions - a.contributions;
      case 'repositories':
        return b.repositories - a.repositories;
      default:
        return 0;
    }
  });
}