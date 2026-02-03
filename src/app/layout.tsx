import type { Metadata, Viewport } from "next";
import { Quantico, Inconsolata } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/utils/json-ld";

const quantico = Quantico({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inconsolata = Inconsolata({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aldi Cahya Ramadhan | Backend Developer",
  description: "Backend Developer specializing in NestJS, ExpressJS, Node.js & Java. Building scalable and robust server-side applications.",
  keywords: ["Backend Developer", "NestJS", "ExpressJS", "Node.js", "Java", "API Development", "Indonesia", "Aldi Cahya Ramadhan"],
  authors: [{ name: "Aldi Cahya Ramadhan" }],
  creator: "Aldi Cahya Ramadhan",
  metadataBase: new URL("https://aldicahyar.dev"),
  openGraph: {
    title: "Aldi Cahya Ramadhan | Backend Developer",
    description: "Backend Developer specializing in NestJS, ExpressJS, Node.js & Java. Building scalable and robust server-side applications.",
    url: "https://aldicahyar.dev",
    siteName: "Aldi Cahya Ramadhan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aldi Cahya Ramadhan | Backend Developer",
    description: "Backend Developer specializing in NestJS, ExpressJS, Node.js & Java",
    creator: "@aldicahyar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ACR Dev",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

import { LanguageProvider } from "@/context/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { GlitchProvider } from "@/context/glitch-context";
import { PageTransition } from "@/components/ui/page-transition";
import { Sidebar } from "@/components/sections/sidebar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/ui/preloader";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${quantico.variable} ${inconsolata.variable} antialiased`}
      >
        <GlitchProvider>
          <LanguageProvider>
            <JsonLd />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:z-[1000] focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-[var(--cyber-orange)] focus:text-black focus:font-bold focus:rounded-md focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
            >
              Skip to main content
            </a>
            {/* Fixed elements - outside PageTransition to avoid transform/filter breaking fixed positioning */}
            <Preloader />
            <LanguageSwitcher />
            <Sidebar />
            <ScrollProgress />
            <Analytics />
            {/* Main content with page transition effect */}
            <PageTransition>
              {children}
            </PageTransition>
          </LanguageProvider>
        </GlitchProvider>
      </body>
    </html>
  );
}
