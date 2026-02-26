// shared/hooks/useTheme.ts
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'app-theme';

const getInitialTheme = (): Theme => {
  // 1. Cek localStorage dulu
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'dark' || stored === 'light') return stored;

  // 2. Fallback ke preferensi sistem
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Terapkan ke <html> setiap kali theme berubah
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Sinkronisasi kalau user mengubah preferensi sistem di luar app
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Hanya ikuti sistem kalau user belum pernah set manual
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const setLightTheme = () => setTheme('light');
  const setDarkTheme  = () => setTheme('dark');

  return { theme, toggleTheme, setLightTheme, setDarkTheme };
};