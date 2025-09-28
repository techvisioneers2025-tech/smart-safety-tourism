
'use client';

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { I18nProvider } from '@/context/i18n';
import { SplashScreen } from '@/components/ui/splash-screen';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Show content by default and only show splash screen if condition is met.
  const [isSplashScreenVisible, setIsSplashScreenVisible] = useState(false);

  useEffect(() => {
    // This effect runs once on the initial client load.
    const splashScreenShown = sessionStorage.getItem('splashScreenShown');

    if (!splashScreenShown && pathname === '/') {
      // If the splash screen hasn't been shown and we are on the homepage, show it.
      setIsSplashScreenVisible(true);
      sessionStorage.setItem('splashScreenShown', 'true');

      // Hide the splash screen after the animation duration.
      const timer = setTimeout(() => {
        setIsSplashScreenVisible(false);
      }, 2500); // This duration should match the splash screen animation.

      return () => clearTimeout(timer);
    }
  }, [pathname]); // Rerunning on pathname change is safe because of the sessionStorage check.


  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <meta name="description" content="Seamless entry and registration for tourists and authorities." />
        <title>CitizEntry</title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased">
        {isSplashScreenVisible ? (
          <SplashScreen />
        ) : (
          <I18nProvider>
            {children}
            <Toaster />
          </I18nProvider>
        )}
      </body>
    </html>
  );
}
