import { redirect } from 'react-router';

import { authenticator } from '@/services/auth.server';
import { commitSession, getSession } from '@/services/session.server';

import type { Route } from './+types/callback';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { accessToken, refreshToken, user } = await authenticator.authenticate(
    'github',
    request,
  );

  const session = await getSession(request.headers.get('Cookie'));
  session.set('user', {
    accessToken,
    refreshToken,
    user: user,
  });

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};
