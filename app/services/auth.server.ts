import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';

import { type GithubUser, createGhClient, fetchUser } from '@/apis/github';

export const authenticator = new Authenticator<{
  user: GithubUser;
  accessToken: string;
  refreshToken: string | null;
}>();

authenticator.use(
  new GitHubStrategy<{
    user: GithubUser;
    accessToken: string;
    refreshToken: string | null;
  }>(
    {
      clientId: process.env.GITHUB_APP_CLIENT_ID!,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET!,
      redirectURI: 'http://localhost:5173/login/github/callback',
      scopes: ['user:email'], // optional
    },
    async ({ tokens }) => {
      const accessToken = tokens.accessToken();
      const refreshToken = tokens.hasRefreshToken()
        ? tokens.refreshToken()
        : null;

      const ghClient = createGhClient(accessToken);
      const user = await fetchUser(ghClient); // 추후 에러 처리 필요

      return {
        user: user!,
        accessToken,
        refreshToken,
      };
    },
  ),
  'github',
);
