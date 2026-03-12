import { Outlet } from 'react-router-dom';
import './auth-layout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout-container">
      <main className="auth-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
