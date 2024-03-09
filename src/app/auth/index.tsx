import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@app/services';
import { UNAUTHORIZED_EVENT } from '@app/constants';

interface AuthProps {
  children: ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      authService.logout();
      navigate('/');
    };

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [navigate]);

  return <>{children}</>;
}
