import { Suspense } from 'react';
import { NavLink } from 'react-router';

import { createGhClient, fetchRepos } from '@/apis/github';
import { RepositoryList } from '@/components/RepositoryList';
import { SiteLogo } from '@/components/SiteLogo';
import { UserProfile } from '@/components/UserProfile';
import { Spacer } from '@/components/ui/Spacer';
import { getSession } from '@/services/session.server';
import { useUserStore } from '@/stores/user';
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

  return {
    repoPromise: fetchRepos(user.login, createGhClient(accessToken)),
  };
}

export default function ({ loaderData }: Route.ComponentProps) {
  const { repoPromise } = loaderData;
  const user = useUserStore((s) => s.user);

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
        <h1>Hello {user.name}!</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <RepositoryList repoPromise={repoPromise} />
        </Suspense>
      </div>
    </main>
  );
}
