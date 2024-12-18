import React from 'react';
import { Search, Calendar, Trophy } from 'lucide-react';
import { TimeRange } from '../types';

interface Props {
  onSearch: (query: string) => void;
  onTimeRangeChange: (range: TimeRange['value']) => void;
  selectedRange: TimeRange['value'];
}

const timeRanges: TimeRange[] = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: '1 Year', value: '1y' },
];

export default function LeaderboardHeader({ onSearch, onTimeRangeChange, selectedRange }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            GitHub Activity Leaderboard
          </h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search developers..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-full sm:w-64"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-400 w-5 h-5" />
            <select
              value={selectedRange}
              onChange={(e) => onTimeRangeChange(e.target.value as TimeRange['value'])}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {timeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}