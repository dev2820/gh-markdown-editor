import type { ComponentProps } from 'react';

import { Avatar } from '@/components/ui/Avatar';
import { useUserStore } from '@/stores/user';
import { cn } from '@/utils/cn';

type UserProfileProps = ComponentProps<'div'>;
export function UserProfile(props: UserProfileProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={cn('flex items-center space-x-4 w-40', className)}
      {...rest}
    >
      <UserPhoto />
      <UserName />
    </div>
  );
}

type UserPhotoProps = ComponentProps<'div'>;
function UserPhoto(props: UserPhotoProps) {
  const user = useUserStore((s) => s.user);

  return (
    <div {...props}>
      <Avatar.Root>
        <Avatar.Image
          src={user.profileUrl ?? undefined}
          alt="Profile Image"
        ></Avatar.Image>
        <Avatar.Fallback>
          {user.name?.slice(0, 2).toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

type UserNameProps = ComponentProps<'div'>;
function UserName(props: UserNameProps) {
  const { className, ...rest } = props;
  const user = useUserStore((s) => s.user);

  return (
    <span className={cn('text-lg font-semibold truncate', className)} {...rest}>
      {user.name ?? 'None'}
    </span>
  );
}
