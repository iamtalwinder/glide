import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import './styles/index.css';
import Auth from './auth';

const App = () => {
  return (
    <>
      <Auth>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </Auth>
    </>
  );
};

export default App;
