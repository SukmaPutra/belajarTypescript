// features/auth/pages/SignupPage.tsx
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/AuthForm';
import { ROUTES } from '@/config/routes';
import { APP_NAME } from '@/shared/constant/index';

export const SignupPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">{APP_NAME}</h1>
          <p className="text-[#94a3b8] mt-2">Buat akun baru</p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
          <RegisterForm />

          <p className="text-center text-[#94a3b8] text-sm mt-6">
            Sudah punya akun?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="text-[#137fec] hover:underline font-medium"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;