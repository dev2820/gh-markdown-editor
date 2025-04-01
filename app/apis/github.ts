import ky from 'ky';

const GITHUB_API_URL = 'https://api.github.com';

const ghClient = ky.create({
  prefixUrl: GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User' | string;
  user_view_type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  notification_email?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export async function fetchRepos(username: string, token: string) {
  try {
    const repos = await ghClient
      .get(`users/${username}/repos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    console.log(repos); // 저장소 리스트 출력
    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}

export type FetchUserSuccess = GithubUser;
export type FetchUserFailed = undefined;
export async function fetchUser(
  token: string,
): Promise<FetchUserSuccess | FetchUserFailed> {
  try {
    const user = await ghClient
      .get<FetchUserSuccess>(`user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    return user;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return undefined;
  }
}
