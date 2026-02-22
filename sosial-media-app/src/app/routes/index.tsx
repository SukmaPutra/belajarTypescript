import { createBrowserRouter } from 'react-router-dom';

import { LoginPage, SignupPage, AuthGuard } from '@/features/auth';

export const router = createBrowserRouter([

  { path: '/login', element: <LoginPage /> },

  { path: '/signup', element: <SignupPage /> },

  {

    path: '/dashboard',

    element: (

      <AuthGuard requireAuth={true}>

        <div>Dashboard - Protected Route</div>

      </AuthGuard>

    ),

  },

]);
