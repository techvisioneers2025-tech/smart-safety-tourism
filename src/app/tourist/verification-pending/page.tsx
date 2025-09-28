
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerificationPendingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic to check if verification is complete can be added here
      // For now, it will redirect to a placeholder dashboard
      router.push('/tourist/dashboard'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-background text-center p-4">
      <svg
        className="animate-spin h-16 w-16 text-primary mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <h1 className="text-3xl font-bold text-primary mb-2 font-headline">
        Hang tight! We're verifying your details...
      </h1>
      <p className="text-muted-foreground">
        This should only take a moment. You will be redirected to your dashboard shortly.
      </p>
    </div>
  );
}
