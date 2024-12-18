import React from 'react';
import { Github, Star, GitFork, Users, UserMinus, Code, Brain } from 'lucide-react';
import { Developer } from '../types';

interface Props {
  developer: Developer;
  rank: number;
  onRemove: () => void;
}

export default function DeveloperCard({ developer, rank, onRemove }: Props) {
  const skillLevel = Math.min(Math.floor(developer.contributions / 100), 5);
  const skills = ['React', 'TypeScript', 'Node.js'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={developer.avatarUrl}
            alt={developer.username}
            className="w-16 h-16 rounded-full border-2 border-blue-500"
            loading="lazy"
          />
          <span className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            #{rank}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {developer.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Github className="w-4 h-4" />
            <a
              href={`https://github.com/${developer.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              @{developer.username}
            </a>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 transition-colors"
          aria-label="Remove from leaderboard"
        >
          <UserMinus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-green-500">
            <Star className="w-5 h-5" />
            <span className="font-semibold text-lg">{developer.contributions}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Contributions</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-purple-500">
            <GitFork className="w-5 h-5" />
            <span className="font-semibold text-lg">{developer.repositories}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Repositories</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-blue-500">
            <Users className="w-5 h-5" />
            <span className="font-semibold text-lg">{developer.followers}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-500" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i < skillLevel
                    ? 'bg-indigo-500 scale-100'
                    : 'bg-gray-300 dark:bg-gray-600 scale-90'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900 
                         text-blue-600 dark:text-blue-300 flex items-center gap-1
                         transform transition-all duration-300 hover:scale-105 hover:rotate-2"
            >
              <Code className="w-4 h-4" />
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="text-orange-500">
            <span className="font-semibold">{developer.streak} days</span>
          </div>
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((developer.streak / 365) * 100, 100)}%` }}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Current Streak</p>
      </div>
    </div>
  );
}