"use client";

import { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Check,
  ArrowRightLeft,
  ShieldCheck,
  BarChartBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

// AppView type (optional)
type AppView = "landing" | "about" | "features" | "dashboard" | "login";

// Props – all optional with defaults
interface LandingProps {
  onGetStarted?: () => void;
  initialSection?: string;
  onViewChange?: (view: AppView) => void;
}

export default function Landing({
  onGetStarted = () => {
    window.location.href = "/dashboard";
  },
  initialSection = "home",
  onViewChange,
}: LandingProps) {
  const { setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (initialSection) {
      const element = document.getElementById(initialSection);
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [initialSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const viewMap: Record<string, AppView> = {
      home: "landing",
      about: "about",
      features: "features",
    };

    if (onViewChange) onViewChange(viewMap[target] || "landing");

    const element = document.getElementById(target);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col min-h-dvh bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo_finance_tracker.svg" // ← your logo file in public/
              alt="FinTrack Logo"
              width={40}
              height={40}
              className="size-8 sm:size-10"
              priority
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              Fin Tra
            </span>
          </Link>

          {/* Desktop Nav + Actions */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="text-sm font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "about")}
                className="text-sm font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "features")}
                className="text-sm font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Features
              </a>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle theme">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={onGetStarted}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 rounded-xl"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
            <div className="px-4 py-6 flex flex-col gap-6">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "home")}
                className="text-base font-medium hover:text-cyan-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "about")}
                className="text-base font-medium hover:text-cyan-600 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "features")}
                className="text-base font-medium hover:text-cyan-600 transition-colors"
              >
                Features
              </a>
              <div className="flex flex-col gap-4 pt-4 border-t">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => setTheme("system")}>
                              System
                            </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  onClick={onGetStarted}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main content – push down from fixed navbar */}
      <main className="flex-1 pt-20 md:pt-24">
        {/* Hero Section */}
        <section
          id="home"
          className="flex items-center justify-center px-4 sm:px-6 py-16 md:py-24 lg:py-32 relative overflow-hidden min-h-[70vh] lg:min-h-screen"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-gradient-to-br from-cyan-400/10 to-cyan-600/5 dark:from-cyan-500/10 dark:to-cyan-700/5 blur-3xl rounded-full" />
          </div>

          <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/60 dark:border-cyan-800/40 bg-cyan-50/60 dark:bg-cyan-950/30 px-5 py-2 text-xs sm:text-sm font-medium text-cyan-700 dark:text-cyan-300">
              Simple. Secure. Yours.
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
              Take Control of Your <br className="hidden md:block" />
              <span className="text-cyan-600 dark:text-cyan-400">
                Financial Future
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              FinTrack gives you clear visibility into your spending, savings,
              and goals — without the complexity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 md:px-10 h-11 md:h-14 text-base md:text-lg bg-zinc-900 dark:bg-cyan-600 hover:bg-zinc-800 dark:hover:bg-cyan-700 text-white rounded-xl font-bold shadow-lg"
              >
                Start Tracking Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 md:px-10 h-11 md:h-14 text-base md:text-lg rounded-xl font-medium border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
                Why Financial Tracker?
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Money management <br className="hidden sm:block" />
                made simple again.
              </h2>
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We built Financial Tracker for real people, not finance experts.
                No complicated categories, no hidden fees, just clear insights
                so you can focus on what matters.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-cyan-600">
                    100%
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Private & Secure
                  </p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-cyan-600">
                    0
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Hidden Fees
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/70 p-6 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="text-xl md:text-2xl font-bold mb-6">
                What makes us different
              </h3>
              <ul className="space-y-5">
                {[
                  {
                    title: "Privacy First",
                    desc: "Your data never leaves your device unless you choose to sync.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Zero Complexity",
                    desc: "No endless categories or confusing reports — just what you need.",
                    icon: Check,
                  },
                  {
                    title: "Works Everywhere",
                    desc: "Seamless sync across phone, tablet, and desktop.",
                    icon: ArrowRightLeft,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 size-6 rounded-full bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="size-4 text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Tools that actually help you save
              </h2>
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                No fluff. Just features designed to give you control over your
                money.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: ArrowRightLeft,
                  title: "Instant Sync",
                  desc: "Changes appear everywhere instantly.",
                },
                {
                  icon: ShieldCheck,
                  title: "Bank-Level Security",
                  desc: "Your data is encrypted and private.",
                },
                {
                  icon: BarChartBig,
                  title: "Clear Insights",
                  desc: "Beautiful charts show where money goes.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="size-12 rounded-xl bg-cyan-600/10 flex items-center justify-center mb-6">
                    <f.icon className="size-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-100 dark:border-zinc-900 py-12 md:py-16 px-4 sm:px-6 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_finance_tracker.svg" // ← your logo file
                alt="FinTrack Logo"
                width={40}
                height={40}
                className="size-7"
                priority
              />
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                FinTra
              </span>
            </div>

            <div className="flex gap-6 md:gap-8">
              <a
                href="#"
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                Support
              </a>
            </div>

            <p>© {new Date().getFullYear()} FinTra. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
