
'use client';

import Image from "next/image";

export function SplashScreen() {
  return (
    <div className="splash-screen fixed inset-0 flex items-center justify-center bg-background z-[100]">
      <div className="splash-icon text-center">
        <Image
            src="https://i.postimg.cc/sxTdr1YN/final-image-1.png"
            alt="CitizEntry Logo"
            width={96}
            height={96}
            className="h-24 w-auto inline-block"
            priority
        />
        <h1 className="text-4xl font-bold text-primary mt-4 font-headline">CitizEntry</h1>
      </div>
    </div>
  );
}
