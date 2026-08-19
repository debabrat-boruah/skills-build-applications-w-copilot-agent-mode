const hostname = window.location.hostname;

const apiHost = hostname.includes('app.github.dev')
  ? `https://${hostname.replace(
      '-5173.app.github.dev',
      '-8000.app.github.dev'
    )}`
  : 'http://localhost:8000';

export const endpoints = {
  users: `${apiHost}/api/users`,
  teams: `${apiHost}/api/teams`,
  activities: `${apiHost}/api/activities`,
  leaderboard: `${apiHost}/api/leaderboard`,
  workouts: `${apiHost}/api/workouts`,
};

export async function fetchCollection(resource) {
  const response = await fetch(endpoints[resource]);

  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

