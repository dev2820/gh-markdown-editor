import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

type SiteLogoProps = ComponentProps<'div'>;
export function SiteLogo(props: SiteLogoProps) {
  const { className, ...rest } = props;

  return (
    <div className={cn(className)} {...rest}>
      logo
    </div>
  );
}
