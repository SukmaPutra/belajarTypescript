// src/features/auth/pages/Login.tsx
import { useNavigate } from 'react-router-dom';
import { login } from '@/features/auth/services/authService';
import LoginForm from '@/features/auth/components/LoginForm';
import type { LoginSchema } from '@/features/auth/schemas/authSchema';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);
      navigate('/');
      return 'Login successful';
    } catch (error) {
      return error instanceof Error ? error.message : 'Login failed';
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default Login;