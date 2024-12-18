import React from 'react';
import { Trophy, Users, GitFork, Star } from 'lucide-react';
import { Developer } from '../types';

interface Props {
  developers: Developer[];
}

export default function Stats({ developers }: Props) {
  const numberOfDevelopers = developers.length;
  const totalContributions = developers.reduce((sum, dev) => sum + dev.contributions, 0);
  const averageContributions = Math.round(totalContributions / (numberOfDevelopers || 1));
  const totalRepositories = developers.reduce((sum, dev) => sum + dev.repositories, 0);
  const averageRepositories = Math.round(totalRepositories / (numberOfDevelopers || 1));
  const totalFollowers = developers.reduce((sum, dev) => sum + dev.followers, 0);
  const averageFollowers = Math.round(totalFollowers / (numberOfDevelopers || 1));
  const averageStreak = Math.round(
    developers.reduce((sum, dev) => sum + dev.streak, 0) / (developers.length || 1)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Trophy className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Contributions</p>
            <p className="text-xl font-bold text-purple-500">{averageContributions.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Followers</p>
            <p className="text-xl font-bold text-blue-500">{averageFollowers.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <GitFork className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Repositories</p>
            <p className="text-xl font-bold text-green-500">{averageRepositories.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Star className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Streak</p>
            <p className="text-xl font-bold text-orange-500">{averageStreak} days</p>
          </div>
        </div>
      </div>
    </div>
  );
}