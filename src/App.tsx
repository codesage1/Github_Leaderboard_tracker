import React, { useState } from 'react';
import { LeaderboardFilters } from './types';
import LeaderboardHeader from './components/LeaderboardHeader';
import DeveloperCard from './components/DeveloperCard';
import AddDeveloperForm from './components/AddDeveloperForm';
import LeaderboardFiltersComponent from './components/LeaderboardFilters';
import Stats from './components/Stats';
import ThemeToggle from './components/ThemeToggle';
import { useGitHubData } from './hooks/useGitHubData';
import { sortDevelopers } from './utils/sorting';
import { Toaster } from 'react-hot-toast';
import { Footer } from './components/Footer';

export default function App() {
  const [filters, setFilters] = useState<LeaderboardFilters>({
    timeRange: '30d',
    searchQuery: '',
    sortBy: 'streak',
  });

  const {
    developers,
    loading,
    error,
    addDeveloper,
    removeDeveloper,
  } = useGitHubData();

  const handleFilterChange = (newFilters: Partial<LeaderboardFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredDevelopers = developers.filter(dev =>
    dev.username.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
    dev.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
  );

  const sortedDevelopers = sortDevelopers(filteredDevelopers, filters.sortBy);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-500 text-center">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <Toaster position="top-right" />
      <ThemeToggle />
      <main className="flex-grow container mx-auto px-4 py-8">
        <LeaderboardHeader
          onSearch={(query) => handleFilterChange({ searchQuery: query })}
          onTimeRangeChange={(range) => handleFilterChange({ timeRange: range })}
          selectedRange={filters.timeRange}
        />
        
        {developers.length > 0 && <Stats developers={developers} />}
        
        <AddDeveloperForm onAdd={addDeveloper} />
        
        <LeaderboardFiltersComponent
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading developers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedDevelopers.map((developer, index) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                rank={index + 1}
                onRemove={() => removeDeveloper(developer.username)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}