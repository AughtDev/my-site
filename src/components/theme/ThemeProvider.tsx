"use client"
import React from "react";

interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
})

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

    React.useEffect(() => {
        // Set initial theme based on user's system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const initialTheme = mediaQuery.matches ? 'dark' : 'light';
        setTheme(initialTheme);
    }, []);

    React.useEffect(() => {
        // Update the data-theme attribute on the html element
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
