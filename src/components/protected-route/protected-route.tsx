import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { Location } from 'react-router-dom';

import { getCookie } from '../../utils/cookie';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const isAuthenticated = Boolean(getCookie('accessToken'));

  const from = (location.state as { from?: Location } | null)?.from;

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate to={from?.pathname || '/'} replace />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
