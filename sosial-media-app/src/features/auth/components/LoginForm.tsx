// src/features/auth/components/LoginForm.tsx
import { useActionState } from 'react';
import { Link } from 'react-router-dom';
import { loginSchema } from '../schemas/authSchema';
import { z } from 'zod';
import { AUTH_ROUTES, AUTH_ERROR_MESSAGES } from '../constants/authConstants';

type LoginSchema = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSubmit: (data: LoginSchema) => Promise<string>;
};

/**
 * Login Form Component
 *
 * Komponen form login dengan desain modern yang terinspirasi dari design system internal.
 * Fitur utama:
 * - Background dengan efek grid radial + blur blobs dekoratif
 * - Dark mode support via class "dark" pada elemen html
 * - Email & password validation menggunakan Zod schema
 * - Loading state dengan spinner saat submit
 * - Pesan error/success yang ditampilkan di bawah form
 * - Tombol social login (Google & Apple)
 *
 * @example
 * ```tsx
 * const { login } = useAuth();
 *
 * <LoginForm
 *   onSubmit={async (data) => {
 *     await login(data.email, data.password);
 *     return 'Login success';
 *   }}
 * />
 * ```
 */
const LoginForm = ({ onSubmit }: LoginFormProps) => {
  // useActionState mengelola state form: message hasil, action handler, dan loading state
  const [message, formAction, isPending] = useActionState(
    async (_: any, formData: FormData) => {
      try {
        // Ambil nilai dari FormData
        const data = {
          email: formData.get('email')?.toString() || '',
          password: formData.get('password')?.toString() || '',
        };

        // Validasi input dengan Zod schema
        const validatedData = loginSchema.parse(data);

        // Panggil handler login yang diterima via props
        const result = await onSubmit(validatedData);
        return result;
      } catch (error) {
        // Kembalikan pesan error validasi Zod sebagai string
        if (error instanceof z.ZodError) {
          return error.issues.map((err) => err.message).join(', ');
        }
        // Kembalikan pesan error dari Error object
        if (error instanceof Error) {
          return error.message;
        }
        // Fallback untuk error tidak terduga
        return AUTH_ERROR_MESSAGES.UNKNOWN_ERROR;
      }
    },
    null
  );

  // Tentukan apakah message merupakan error berdasarkan kata kunci
  const isError =
    message &&
    (message.toLowerCase().includes('gagal') ||
      message.toLowerCase().includes('failed') ||
      message.toLowerCase().includes('invalid') ||
      message.toLowerCase().includes('tidak'));

  // Style class untuk banner pesan error atau sukses
  const messageClass = isError
    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
    : 'text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800';

  return (
    <>
      {/*
       * Inline styles untuk efek yang tidak bisa dicapai dengan Tailwind saja:
       * - Grid pattern radial-gradient sebagai background tekstur halus
       * - Font Plus Jakarta Sans dari Google Fonts
       */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

        .login-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Pola grid titik-titik sebagai background dekoratif */
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(19, 127, 236, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Warna brand utama */
        .bg-primary { background-color: #137fec; }
        .hover-bg-primary:hover { background-color: #1a6dc7; }
        .text-primary { color: #137fec; }
        .border-primary { border-color: #137fec; }
        .ring-primary:focus { --tw-ring-color: #137fec; }
        .bg-primary-10 { background-color: rgba(19, 127, 236, 0.1); }

        /* Background utama */
        .bg-background-dark { background-color: #101922; }
        .bg-card-dark { background-color: #1A2632; }

        /* Blur blob dekoratif kiri atas */
        .blob-top {
          position: absolute;
          top: 0;
          left: 25%;
          width: 24rem;
          height: 24rem;
          background: rgba(19, 127, 236, 0.2);
          border-radius: 9999px;
          filter: blur(128px);
          pointer-events: none;
          transform: translateY(-50%);
        }

        /* Blur blob dekoratif kanan bawah */
        .blob-bottom {
          position: absolute;
          bottom: 0;
          right: 25%;
          width: 24rem;
          height: 24rem;
          background: rgba(19, 127, 236, 0.1);
          border-radius: 9999px;
          filter: blur(128px);
          pointer-events: none;
          transform: translateY(50%);
        }

        /* Input field styling */
        .login-input {
          display: block;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          background-color: #f9fafb;
          color: #111827;
          padding: 0.625rem 2.5rem 0.625rem 0.75rem;
          font-size: 0.875rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          outline: none;
        }
        .login-input:focus {
          border-color: #137fec;
          box-shadow: 0 0 0 3px rgba(19, 127, 236, 0.2);
        }
        .login-input::placeholder { color: #9ca3af; }
        .login-input:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Dark mode overrides untuk input */
        .dark .login-input {
          border-color: #374151;
          background-color: rgba(17, 24, 39, 0.5);
          color: #fff;
        }
        .dark .login-input::placeholder { color: #4b5563; }

        /* Tombol submit utama */
        .btn-primary {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.625rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: #fff;
          background-color: #137fec;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
        }
        .btn-primary:hover:not(:disabled) { background-color: #1a6dc7; }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Tombol social login (Google / Apple) */
        .btn-social {
          display: inline-flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          background: #fff;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: background-color 0.15s;
        }
        .btn-social:hover { background-color: #f9fafb; }
        .dark .btn-social {
          border-color: #374151;
          background: #1f2937;
          color: #e5e7eb;
        }
        .dark .btn-social:hover { background: #374151; }

        /* Spinner animasi */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          animation: spin 1s linear infinite;
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.75rem;
          margin-left: -0.25rem;
        }
      `}</style>

      {/*
       * Root wrapper — menerapkan dark mode dan font family.
       * min-h-screen + flex untuk centering vertikal & horizontal.
       * overflow-hidden agar blob dekoratif tidak membuat scrollbar.
       */}
      <div
        className="login-root bg-background-dark dark:bg-background-dark"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
        }}
      >
        {/* Pola grid titik-titik sebagai lapisan background */}
        <div
          className="bg-grid-pattern"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Blob cahaya kiri atas — efek ambient dekoratif */}
        <div className="blob-top" />

        {/* Blob cahaya kanan bawah — efek ambient dekoratif */}
        <div className="blob-bottom" />

        {/* ===== MAIN CARD ===== */}
        <main
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '28rem',
            padding: '1.5rem',
            zIndex: 10,
          }}
        >
          {/*
           * Card container utama dengan shadow tebal.
           * Background gelap (bg-card-dark) dan border tipis untuk depth.
           */}
          <div
            className="bg-card-dark"
            style={{
              border: '1px solid #1f2937',
              borderRadius: '0.75rem',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '2.5rem' }}>

              {/* ===== HEADER CARD ===== */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                {/* Ikon share sebagai logo produk */}
                <div
                  className="bg-primary-10 text-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  <span className="material-icons" style={{ fontSize: '1.75rem' }}>
                    share
                  </span>
                </div>

                {/* Judul halaman */}
                <h1
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    marginBottom: '0.5rem',
                    color: '#fff',
                  }}
                >
                  Welcome Back
                </h1>

                {/* Subtitle */}
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  Please enter your details to sign in.
                </p>
              </div>

              {/* ===== FORM ===== */}
              <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Input Email */}
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#d1d5db',
                      marginBottom: '0.375rem',
                    }}
                  >
                    Email address
                  </label>
                  {/* Wrapper posisi relatif untuk menempatkan ikon di dalam input */}
                  <div style={{ position: 'relative' }}>
                    <input
                      className="login-input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      required
                      autoComplete="email"
                      disabled={isPending}
                    />
                    {/* Ikon mail di sisi kanan input (dekoratif) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '0 0 0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '0.75rem',
                        pointerEvents: 'none',
                        color: '#6b7280',
                      }}
                    >
                      <span className="material-icons" style={{ fontSize: '1.125rem' }}>
                        mail_outline
                      </span>
                    </div>
                  </div>
                </div>

                {/* Input Password */}
                <div>
                  {/* Baris label + link forgot password */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.375rem',
                    }}
                  >
                    <label
                      htmlFor="password"
                      style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#d1d5db',
                      }}
                    >
                      Password
                    </label>
                  </div>
                  {/* Wrapper posisi relatif untuk ikon kunci */}
                  <div style={{ position: 'relative' }}>
                    <input
                      className="login-input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      disabled={isPending}
                    />
                    {/* Ikon kunci di sisi kanan input (dekoratif) */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '0 0 0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '0.75rem',
                        pointerEvents: 'none',
                        color: '#6b7280',
                      }}
                    >
                      <span className="material-icons" style={{ fontSize: '1.125rem' }}>
                        lock_outline
                      </span>
                    </div>
                  </div>
                  {/* Link lupa password — diletakkan di bawah input */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <Link
                      to="/forgot-password"
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#137fec',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Tombol Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary"
                >
                  {isPending ? (
                    /* Spinner ditampilkan saat proses login berlangsung */
                    <>
                      <svg
                        className="spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          style={{ opacity: 0.25 }}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          style={{ opacity: 0.75 }}
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>

              {/* ===== DIVIDER "Or continue with" ===== */}
              <div style={{ position: 'relative', margin: '1.5rem 0' }}>
                {/* Garis horizontal */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      borderTop: '1px solid #374151',
                    }}
                  />
                </div>

              </div>

              {/* ===== LINK DAFTAR ===== */}
              <p
                style={{
                  marginTop: '2rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                }}
              >
                Don't have an account?{' '}
                <Link
                  to={AUTH_ROUTES.REGISTER}
                  style={{
                    fontWeight: 600,
                    color: '#137fec',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                >
                  Sign up
                </Link>
              </p>

              {/* ===== BANNER PESAN ERROR / SUKSES ===== */}
              {message && (
                <div
                  className={messageClass}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {message}
                </div>
              )}

            </div>
          </div>

          {/* Link bantuan di luar card */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <a
              href="#"
              style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                textDecoration: 'none',
                transition: 'color 0.15s',
              }}
            >
              Need help signing in?
            </a>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginForm;