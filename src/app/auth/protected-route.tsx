import { Navigate } from 'react-router-dom';
import { JWT_ACCESS_TOKEN_KEY } from '@app/constants';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem(JWT_ACCESS_TOKEN_KEY) !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
