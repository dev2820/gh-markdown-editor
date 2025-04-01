import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import { ScreenLoading } from '@/components/ScreenLoading';
import { useAuth } from '@/contexts/AuthContext';

type RequireAuthenticationProps = PropsWithChildren;
export function RequireAuthentication(props: RequireAuthenticationProps) {
  const { isSigned, isLoading } = useAuth();
  const { children } = props;

  if (isLoading) {
    return <ScreenLoading />;
  }
  if (!isSigned) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
