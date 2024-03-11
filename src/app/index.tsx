import { Route, Routes } from 'react-router-dom';
import { makeServer } from '@mocks/api';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import './styles/index.css';
import Auth from './auth';
import ProtectedRoute from './auth/protected-route';

makeServer();

const App = () => {
  return (
    <>
      <Auth>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>Dashboard</>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Auth>
    </>
  );
};

export default App;
