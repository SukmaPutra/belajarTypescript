// src/features/auth/components/SignupForm.tsx
import { useActionState } from 'react';
import { Link } from 'react-router-dom';
import { signupSchema, type SignupSchema, VALIDATION_RULES } from '../schemas/authSchema';
import { z } from 'zod';
import { AUTH_ROUTES, AUTH_ERROR_MESSAGES } from '../constants/authConstants';

type SignupFormProps = {
  onSubmit: (data: Omit<SignupSchema, 'confirmPassword'>) => Promise<string>;
};

/**
 * Signup Form Component
 * 
 * Form khusus untuk signup dengan:
 * - Email validation
 * - Strong password validation (8+ chars, uppercase, number, special char)
 * - Password confirmation check (harus sama)
 * - Password requirements display
 * - Real-time feedback
 * - Loading state saat submit
 * 
 * @example
 * ```tsx
 * const { signup } = useAuth();
 * 
 * <SignupForm 
 *   onSubmit={async (data) => {
 *     await signup(data.email, data.password);
 *     return 'Signup success';
 *   }}
 * />
 * ```
 */
const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const [message, formAction, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      try {
        const data = {
          email: formData.get('email')?.toString() || '',
          password: formData.get('password')?.toString() || '',
          confirmPassword: formData.get('confirmPassword')?.toString() || '',
        };

        // Validate dengan signupSchema (includes password confirmation)
        const validatedData = signupSchema.parse(data);

        // Call onSubmit handler (tanpa confirmPassword)
        const result = await onSubmit({
          email: validatedData.email,
          password: validatedData.password,
        });
        return result;
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Return validation errors sebagai string
          return error.issues.map((err) => err.message).join(', ');
        }
        if (error instanceof Error) {
          return error.message;
        }
        return AUTH_ERROR_MESSAGES.UNEXPECTED_ERROR;
      }
    },
    null
  );

  // Check apakah error atau success
  const isError = message && (
    message.toLowerCase().includes('gagal') ||
    message.toLowerCase().includes('failed') ||
    message.toLowerCase().includes('invalid') ||
    message.toLowerCase().includes('tidak') ||
    message.toLowerCase().includes('cocok')
  );

  const messageClass = isError
    ? 'text-red-500 bg-red-50 border border-red-200'
    : 'text-green-500 bg-green-50 border border-green-200';

  return (
    <section
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/b4/ae/5e/b4ae5e2e3a0009177b65c160dc3c95ef.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md mx-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {/* Logo / Branding */}
          <Link
            to="/"
            className="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white hover:opacity-80 transition"
          >
            🔐 Create Account
          </Link>

          {/* Title */}
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>

          {/* Password Requirements Info */}
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
              Password requirements:
            </p>
            <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
              {VALIDATION_RULES.STRONG_PASSWORD.rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <form className="space-y-4 md:space-y-6" action={formAction}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                autoComplete="email"
                disabled={isPending}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {VALIDATION_RULES.EMAIL.description}
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                autoComplete="new-password"
                disabled={isPending}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Gunakan password yang kuat dengan kombinasi huruf, angka, dan simbol
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                autoComplete="new-password"
                disabled={isPending}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Harus sama dengan password di atas
              </p>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
                  disabled={isPending}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{' '}
                  <a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Link to Login */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to={AUTH_ROUTES.LOGIN}
                className="font-medium text-blue-600 hover:underline dark:text-blue-500 transition"
              >
                Sign in
              </Link>
            </p>
          </form>

          {/* Error/Success Message */}
          {message && (
            <div className={`${messageClass} p-4 rounded-lg text-sm border`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignupForm;