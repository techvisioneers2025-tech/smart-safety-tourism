

'use client';

import {
  Bell,
  LayoutGrid,
  Map,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes('/itinerary')) return 'My Itinerary';
    if (pathname.includes('/alerts')) return 'Alerts';
    if (pathname.includes('/weather')) return 'Weather & Safety';
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/emergency-chat')) return 'Emergency Chat';
    return 'Dashboard';
  };

  const navItems = [
    { href: '/tourist/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { href: '/tourist/itinerary', icon: Map, label: 'Itinerary' },
    { href: '/tourist/alerts', icon: Bell, label: 'Alerts' },
    { href: '/tourist/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col h-dvh bg-background">
      <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 z-10">
        <h1 className="text-xl font-bold text-primary">{getPageTitle()}</h1>
        <Link href="/tourist/settings">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-secondary/20">
        {children}
      </main>

      <nav className="grid grid-cols-4 items-center justify-items-center p-2 border-t bg-background sticky bottom-0 z-10">
        {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
                <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                        "flex flex-col items-center gap-1 p-2 rounded-md transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground hover:text-primary/80"
                    )}
                >
                    <item.icon className="h-6 w-6" />
                    <span className="text-xs font-medium">{item.label}</span>
                </Link>
            )
        })}
      </nav>
    </div>
  );
}
