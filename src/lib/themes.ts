
export type Theme = {
    name: string;
    id: string;
    className: string;
    primaryColor: string;
    backgroundGradient: {
      from: string;
      to: string;
    };
  };
  
  export const themes: Theme[] = [
    {
      name: "النمط الافتراضي",
      id: "light",
      className: "light",
      primaryColor: "hsl(217 91% 60%)",
      backgroundGradient: {
        from: "hsl(217 91% 60% / 0.1)",
        to: "transparent"
      }
    },
    {
      name: "النمط الداكن",
      id: "dark",
      className: "dark",
      primaryColor: "hsl(217 91% 65%)",
      backgroundGradient: {
        from: "hsl(217 91% 65% / 0.1)",
        to: "transparent"
      }
    },
    {
      name: "النمط الأزرق",
      id: "light",
      className: "blue-theme",
      primaryColor: "hsl(224 76% 48%)",
      backgroundGradient: {
        from: "hsl(224 76% 48% / 0.1)",
        to: "transparent"
      }
    }
  ];
  
  export const defaultTheme = themes[0];
  
  // Custom hook لاستخدام السمات
  import { useTheme } from 'next-themes';
  import { useEffect, useState } from 'react';
  
  export const useThemeColors = () => {
    const { theme, systemTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  
    useEffect(() => {
      const themeId = theme === 'system' ? systemTheme : theme;
      const selectedTheme = themes.find(t => t.id === themeId) || defaultTheme;
      setCurrentTheme(selectedTheme);
      
      // تحديث متغيرات CSS للتدرج
      document.documentElement.style.setProperty('--gradient-from', selectedTheme.backgroundGradient.from);
      document.documentElement.style.setProperty('--gradient-to', selectedTheme.backgroundGradient.to);
    }, [theme, systemTheme]);
  
    return currentTheme;
  };