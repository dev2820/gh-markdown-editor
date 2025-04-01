import { NavLink, redirect } from 'react-router';

import { SiteLogo } from '@/components/SiteLogo';
import { UserProfile } from '@/components/UserProfile';
import { Spacer } from '@/components/ui/Spacer';
import { authenticator } from '@/services/auth.server';
import { cn } from '@/utils/cn';

import type { Route } from './+types/dashboard';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await authenticator.authenticate('github', request);

  if (user) {
    return { user: user };
  } else {
    return redirect('/login');
  }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;
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
