import { createContext, useState, useEffect, type ReactNode } from 'react'; 

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode
}

const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>('light');

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider  value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export { ThemeContext, ThemeProvider };