import { authenticator } from '@/services/auth.server';

import type { Route } from './+types/github';

export const loader = async ({ request }: Route.LoaderArgs) => {
  return authenticator.authenticate('github', request);
};
