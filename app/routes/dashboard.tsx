import { NavLink, redirect } from 'react-router';

import { fetchRepos } from '@/apis/github';
import { SiteLogo } from '@/components/SiteLogo';
import { UserProfile } from '@/components/UserProfile';
import { Spacer } from '@/components/ui/Spacer';
import { getSession } from '@/services/session.server';
import { cn } from '@/utils/cn';

import type { Route } from './+types/dashboard';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const { user, accessToken } = session.get('user');

  if (!user) {
    return redirect('/login');
  }

  try {
    const repos = await fetchRepos(user.login, accessToken);
    return { user, repos };
  } catch (err) {
    console.error('failed to fetch repos', err);
    return { user, repos: [] };
  }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user, repos } = loaderData;
  console.log(user, repos);
  return (
    <main className={cn('flex flex-col w-dvw h-dvh overflow-auto')}>
      <header className="h-12">
        <div
          className={cn(
            'h-full flex flex-row place-items-center mx-auto w-full max-w-desktop px-4 items-stretch',
          )}
        >
          <NavLink to="/">
            <SiteLogo className="h-full" />
          </NavLink>
          <Spacer />
          <UserProfile />
        </div>
      </header>
      <div className="w-full max-w-desktop mx-auto px-4">
        dashboard
        {user.name}
      </div>
    </main>
  );
}
