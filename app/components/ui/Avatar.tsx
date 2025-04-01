import * as AvatarPrimitive from '@radix-ui/react-avatar';
import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type RootProps = ComponentProps<typeof AvatarPrimitive.Root>;
const Root = (props: RootProps) => {
  const { className, ...rest } = props;
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...rest}
    />
  );
};
Root.displayName = AvatarPrimitive.Root.displayName;

type ImageProps = ComponentProps<typeof AvatarPrimitive.Image>;
const Image = (props: ImageProps) => {
  const { className, ...rest } = props;
  return (
    <AvatarPrimitive.Image
      className={cn('aspect-square h-full w-full', className)}
      {...rest}
    />
  );
};
Image.displayName = AvatarPrimitive.Image.displayName;

type FallbackProps = ComponentProps<typeof AvatarPrimitive.Fallback>;
const Fallback = (props: FallbackProps) => {
  const { className, ...rest } = props;
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted',
        className,
      )}
      {...rest}
    />
  );
};
Fallback.displayName = AvatarPrimitive.Fallback.displayName;

export const Avatar = {
  Root,
  Fallback,
  Image,
};
