import { useState } from 'react';
import { Developer } from '../types';
import { fetchGitHubUser } from '../services/api/github';
import { useLocalStorage } from './useLocalStorage';
import { toast } from 'react-hot-toast';

export function useGitHubData() {
  const [developers, setDevelopers] = useLocalStorage<Developer[]>('github-developers', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addDeveloper = async (username: string) => {
    // Check if developer already exists
    if (developers.some(dev => dev.username.toLowerCase() === username.toLowerCase())) {
      toast.error('Developer already exists in the leaderboard!');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      const developer = await fetchGitHubUser(username);
      
      if (developer) {
        setDevelopers(prev => [...prev, { ...developer, isFriend: true }]);
        toast.success(`Successfully added ${developer.name} to the leaderboard!`);
        return true;
      }
      return false;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add developer';
      setError(message);
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeDeveloper = (username: string) => {
    setDevelopers(prev => prev.filter(dev => dev.username !== username));
    toast.success('Developer removed from leaderboard');
  };

  const toggleFriend = (username: string) => {
    setDevelopers(prev =>
      prev.map(dev =>
        dev.username === username
          ? { ...dev, isFriend: !dev.isFriend }
          : dev
      )
    );
    const developer = developers.find(dev => dev.username === username);
    if (developer) {
      toast.success(`${developer.name} is now ${developer.isFriend ? 'removed from' : 'added to'} friends`);
    }
  };

  return {
    developers,
    loading,
    error,
    addDeveloper,
    removeDeveloper,
    toggleFriend,
  };
}