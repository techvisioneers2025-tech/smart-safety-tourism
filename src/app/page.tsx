
'use client';

import { Button } from "@/components/ui/button";
import { User, Building, Menu, Github, Instagram, Twitter, MessageSquare } from "lucide-react";
import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { useI18n } from "@/context/i18n";
import React from "react";
import ChatWidget from "@/components/ui/chat-widget";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function Home() {
  const { t } = useI18n();
  const heroImage = placeholderImages.find(p => p.id === 'hero-image');
  const journeyImage = placeholderImages.find(p => p.id === 'journey-image');
  const blockchainImage = placeholderImages.find(p => p.id === 'blockchain-security-image');
  const acceptanceImage = placeholderImages.find(p => p.id === 'global-acceptance-image');
  const accessImage = placeholderImages.find(p => p.id === 'easy-access-image');
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <Link href="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <Image
              src="https://i.postimg.cc/sxTdr1YN/final-image-1.png"
              alt="CitizEntry Logo"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
          <span className="text-lg font-headline">{t('home.header.title')}</span>
        </Link>
        <nav className="ml-10 hidden lg:flex gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">{t('home.header.nav.home')}</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">{t('home.header.nav.pricing')}</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">{t('home.header.nav.about')}</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">{t('home.header.nav.contact')}</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden lg:flex">
            <LanguageSelector />
          </div>
          <div className="hidden sm:flex items-center gap-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{t('home.header.login')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/tourist/dashboard" prefetch={true}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('home.header.touristLogin')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/authority/dashboard" prefetch={true}>
                    <Building className="mr-2 h-4 w-4" />
                    <span>{t('home.header.authorityLogin')}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild>
              <Link href="/tourist/register">{t('home.header.signUp')}</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">{t('home.header.login')}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/tourist/dashboard" prefetch={true}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{t('home.header.touristLogin')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/authority/dashboard" prefetch={true}>
                    <Building className="mr-2 h-4 w-4" />
                    <span>{t('home.header.authorityLogin')}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild size="sm">
              <Link href="/tourist/register">{t('home.header.signUp')}</Link>
            </Button>
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigation links for mobile view.</SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <LanguageSelector />
              </div>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                  {t('home.header.nav.home')}
                </Link>
                <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                  {t('home.header.nav.pricing')}
                </Link>
                <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                  {t('home.header.nav.about')}
                </Link>
                <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" onClick={() => setIsSheetOpen(false)}>
                  {t('home.header.nav.contact')}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <ChatWidget />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <TypingAnimation
                  text={t('home.hero.headline')}
                  className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-primary font-headline"
                />
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('home.hero.subtext')}
                </p>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  priority
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              )}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">{t('home.saferJourney.heading')}</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('home.saferJourney.subtext')}
                </p>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/tourist/register">
                    {t('home.saferJourney.cta')}
                  </Link>
                </Button>
              </div>
              {journeyImage && (
                <Image
                  src={journeyImage.imageUrl}
                  alt={journeyImage.description}
                  width={600}
                  height={400}
                  data-ai-hint={journeyImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              )}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">{t('home.howItWorks.eyebrow')}</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">{t('home.howItWorks.headline')}</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    {t('home.howItWorks.subtext')}
                  </p>
                </div>
                 <div className="flex items-center gap-4">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href="/tourist/register">{t('home.howItWorks.cta')}</Link>
                  </Button>
                  <Link href="#" className="font-semibold text-muted-foreground hover:text-foreground">{t('home.howItWorks.learnMore')} →</Link>
                </div>
              </div>
              <div className="space-y-8">
                  <div className="space-y-4">
                      <h4 className="text-2xl font-semibold">{t('home.howItWorks.steps.0.title')}</h4>
                      <p className="text-muted-foreground">{t('home.howItWorks.steps.0.description')}</p>
                      <div className="border-t border-border"></div>
                  </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-semibold">{t('home.howItWorks.steps.1.title')}</h4>
                      <p className="text-muted-foreground">{t('home.howItWorks.steps.1.description')}</p>
                      <div className="border-t border-border"></div>
                  </div>
                   <div className="space-y-4">
                      <h4 className="text-2xl font-semibold">{t('home.howItWorks.steps.2.title')}</h4>
                      <p className="text-muted-foreground">{t('home.howItWorks.steps.2.description')}</p>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">{t('home.whyChoose.headline')}</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="relative rounded-lg shadow-md overflow-hidden h-64 flex flex-col justify-end p-6">
                {blockchainImage && (
                  <Image
                    src={blockchainImage.imageUrl}
                    alt={blockchainImage.description}
                    fill
                    data-ai-hint={blockchainImage.imageHint}
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">{t('home.whyChoose.features.0.title')}</h3>
                    <p className="text-white/80">{t('home.whyChoose.features.0.description')}</p>
                </div>
              </div>

              <div className="relative rounded-lg shadow-md overflow-hidden h-64 flex flex-col justify-end p-6">
                 {acceptanceImage && (
                  <Image
                    src={acceptanceImage.imageUrl}
                    alt={acceptanceImage.description}
                    fill
                    data-ai-hint={acceptanceImage.imageHint}
                    className="object-cover"
                  />
                )}
                 <div className="absolute inset-0 bg-black/60"></div>
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">{t('home.whyChoose.features.1.title')}</h3>
                    <p className="text-white/80">{t('home.whyChoose.features.1.description')}</p>
                 </div>
              </div>
              
              <div className="relative rounded-lg shadow-md overflow-hidden h-64 flex flex-col justify-end p-6">
                 {accessImage && (
                  <Image
                    src={accessImage.imageUrl}
                    alt={accessImage.description}
                    fill
                    data-ai-hint={accessImage.imageHint}
                    className="object-cover"
                  />
                )}
                 <div className="absolute inset-0 bg-black/60"></div>
                 <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 text-white">{t('home.whyChoose.features.2.title')}</h3>
                    <p className="text-white/80">{t('home.whyChoose.features.2.description')}</p>

                 </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col items-center justify-center gap-4 p-6 border-t md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">{t('home.footer.copyright')}</p>
        <div className="flex gap-6">
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <MessageSquare className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
