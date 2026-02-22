// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider }  from '@/core/context/AuthProvider';
import { AppRoutes }     from '@/app/routes';

 function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;