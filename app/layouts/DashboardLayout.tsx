import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router';

import { SiteLogo } from '@/components/SiteLogo';
import { UserProfile } from '@/components/UserProfile';
import { Spacer } from '@/components/ui/Spacer';
import { signOut } from '@/libs/auth';
import { cn } from '@/utils/cn';

type DashboardLayoutProps = PropsWithChildren;
export function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;
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
          <button onClick={signOut}>logout</button>
        </div>
      </header>
      <div className="w-full max-w-desktop mx-auto px-4">{children}</div>
    </main>
  );
}
