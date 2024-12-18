import React from 'react';
import { LeaderboardFilters } from '../types';

interface Props {
  filters: LeaderboardFilters;
  onFilterChange: (filters: Partial<LeaderboardFilters>) => void;
}

export default function LeaderboardFiltersComponent({ filters, onFilterChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <select
        value={filters.sortBy}
        onChange={(e) => onFilterChange({ sortBy: e.target.value })}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200"
      >
        <option value="streak">Streak</option>
        <option value="contributions">Contributions</option>
        <option value="repositories">Repositories</option>
        <option value="followers">Followers</option>
      </select>
    </div>
  );
}