"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { dictionary } from "@/data/dictionary";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load language preference from local storage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("acr-language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "id")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(savedLang);
    }
    setIsLoaded(true);
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("acr-language", language);
    }
  }, [language, isLoaded]);

  const toggleLanguage = async () => {
    setIsTransitioning(true);
    // Tunggu animasi blur in selesai
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setLanguage((prev) => (prev === "en" ? "id" : "en"));
    
    // Beri sedikit jeda saat state blur maksimal agar transisi terasa smooth
    await new Promise(resolve => setTimeout(resolve, 100));
    
    setIsTransitioning(false);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = dictionary[language];

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Missing translation for key: ${path} in language: ${language}`);
        return path;
      }
      current = current[key];
    }

    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
