import { githubConfig } from '../../config/github';
import { GitHubUser, Developer } from '../../types';

export async function fetchGitHubUser(username: string): Promise<Developer | null> {
  try {
    const response = await fetch(
      `${githubConfig.apiUrl}/users/${username}`,
      { headers: githubConfig.headers }
    );
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('GitHub API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      if (response.status === 401) {
        throw new Error('GitHub token is invalid or expired. Please check your token.');
      }
      if (response.status === 403) {
        throw new Error('Rate limit exceeded or token permissions issue. Please check your token.');
      }
      if (response.status === 404) {
        throw new Error('Developer not found on GitHub.');
      }
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    const userData: GitHubUser = await response.json();
    const contributions = await fetchContributions(username);
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
    throw error;
  }
}

async function fetchContributions(username: string): Promise<number> {
  try {
    const response = await fetch(
      `${githubConfig.apiUrl}/users/${username}/events?per_page=100`,
      { headers: githubConfig.headers }
    );
    const events = await response.json();
    return events.filter((event: any) => 
      ['PushEvent', 'PullRequestEvent'].includes(event.type)
    ).length;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return 0;
  }
}

async function calculateStreak(username: string): Promise<number> {
  try {
    const response = await fetch(
      `${githubConfig.apiUrl}/users/${username}/events?per_page=100`,
      { headers: githubConfig.headers }
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