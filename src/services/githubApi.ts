import { GITHUB_TOKEN, GITHUB_API_URL } from '../config/github';
import { GitHubUser, Developer } from '../types';

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'Content-Type': 'application/json',
};

export async function fetchGitHubUser(username: string): Promise<Developer | null> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, { headers });
    if (!response.ok) return null;
    
    const userData: GitHubUser = await response.json();
    
    // Fetch contributions
    const contributionsResponse = await fetch(
      `${GITHUB_API_URL}/users/${username}/events?per_page=100`,
      { headers }
    );
    const events = await contributionsResponse.json();
    const contributions = events.filter((event: any) => 
      ['PushEvent', 'PullRequestEvent'].includes(event.type)
    ).length;

    // Calculate streak (simplified version)
    const streak = await calculateStreak(username);

    return {
      id: String(userData.id),
      username: userData.login,
      avatarUrl: userData.avatar_url,
      name: userData.name || userData.login,
      contributions,
      followers: userData.followers,
      repositories: userData.public_repos,
      streak,
      rank: 0,
    };
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return null;
  }
}

async function calculateStreak(username: string): Promise<number> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/events?per_page=100`,
      { headers }
    );
    const events = await response.json();
    
    const contributions = events
      .filter((event: any) => ['PushEvent', 'PullRequestEvent'].includes(event.type))
      .map((event: any) => new Date(event.created_at).toISOString().split('T')[0]);
    
    if (contributions.length === 0) return 0;
    
    let streak = 1;
    let currentDate = new Date(contributions[0]);
    
    for (let i = 1; i < contributions.length; i++) {
      const prevDate = new Date(contributions[i - 1]);
      const currDate = new Date(contributions[i]);
      
      const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    console.error('Error calculating streak:', error);
    return 0;
  }
}