import { fetchUser } from "@/apis/github";
import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github"

export const authenticator = new Authenticator();

authenticator.use(
  new GitHubStrategy(
    {
      clientId: process.env.GITHUB_APP_CLIENT_ID!,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET!,
      redirectURI: "https://example.app/auth/callback",
      scopes: ["user:email"], // optional
    },
    async ({ tokens, request }) => {
      const user = await fetchUser(tokens.accessToken());

      return {
        user,
        accessToken: tokens.accessToken(),
        refreshToken: tokens.hasRefreshToken() ? tokens.refreshToken() : null,
      }
    }
  ),
  "github"
);