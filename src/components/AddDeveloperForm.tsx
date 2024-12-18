import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface Props {
  onAdd: (username: string) => Promise<void>;
}

export default function AddDeveloperForm({ onAdd }: Props) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      await onAdd(username.trim());
      setUsername('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 disabled:opacity-50 flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          {isLoading ? 'Adding...' : 'Add Friend'}
        </button>
      </div>
    </form>
  );
}