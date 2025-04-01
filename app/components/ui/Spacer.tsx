import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type SpacerProps = ComponentProps<'div'>;
export function Spacer(props: SpacerProps) {
  const { className, ...rest } = props;

  return <div className={cn('flex-1', className)} {...rest} />;
}
