// app/routes/index.tsx
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { AuthGuard, PublicGuard } from '@/features/auth';

// Pages — Auth
import { LoginPage }  from '@/features/auth/pages/LoginPage';
import { SignupPage } from '@/features/auth/pages/SignupPage';

// Pages — App
import { HomePage }         from '@/app/pages/Home';
import { FeedPage }         from '@/app/pages/FeedPage';
import { ProfilePage }      from '@/app/pages/ProfilePage';
import { NotFoundPage }     from '@/app/pages/NotFound';
import { LoadingPage }      from '@/app/pages/LoadingPage';



// Layout
import { MainLayout }   from '@/app/layout/MainLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route
        path={ROUTES.HOME}
        element={
          <PublicGuard>
            <HomePage />
          </PublicGuard>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicGuard>
            <LoginPage />
          </PublicGuard>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicGuard>
            <SignupPage />
          </PublicGuard>
        }
      />

      {/* ── Protected Routes — pakai MainLayout ── */}
      <Route
        element={
          <AuthGuard>
            <MainLayout />
          </AuthGuard>
        }
      >
        <Route path={ROUTES.FEED}          element={<FeedPage />} />
        <Route path={ROUTES.PROFILE}       element={<ProfilePage />} />
        <Route path={ROUTES.NOTIFICATIONS} element={<div>Notifikasi</div>} />
        <Route path={ROUTES.MESSAGES}      element={<div>Pesan</div>} />
        <Route path={ROUTES.EXPLORE}       element={<div>Explore</div>} />
      </Route>

      {/* ── 404 ── */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};