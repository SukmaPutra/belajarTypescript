// src/features/auth/pages/Signup.tsx
import { useNavigate } from 'react-router-dom';
import { signup } from '@/features/auth/services/authService';
import SignupForm from '../components/SignupForm';
import type { SignupSchema } from '../schemas/authSchema';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: Omit<SignupSchema, 'confirmPassword'>) => {
    try {
      await signup(data.email, data.password);
      navigate('/login');
      return 'Signup successful! Please login.';
    } catch (error) {
      return error instanceof Error ? error.message : 'Signup failed';
    }
  };

  return <SignupForm onSubmit={handleSignup} />;
};

export default Signup;