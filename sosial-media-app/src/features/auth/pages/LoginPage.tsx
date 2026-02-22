// features/auth/pages/LoginPage.tsx
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/AuthForm';
import { ROUTES } from '@/config/routes';
import { APP_NAME } from '@/shared/constant/index';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">{APP_NAME}</h1>
          <p className="text-[#94a3b8] mt-2">Masuk ke akunmu</p>
        </div>

        {/* Form */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
          <LoginForm />

          <p className="text-center text-[#94a3b8] text-sm mt-6">
            Belum punya akun?{' '}
            <Link
              to={ROUTES.REGISTER}
              className="text-[#137fec] hover:underline font-medium"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;