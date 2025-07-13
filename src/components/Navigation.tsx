"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const links = [
    { href: "/about", label: "About" },
    { href: "/articles", label: "Articles" },
    { href: "/agentops", label: "AgentOps" },
  ];

  return (
    <header className="pointer-events-none relative z-50 flex flex-none flex-col">
      <div className="top-0 z-10 h-16 pt-6">
        <div className="sm:px-8 top-[var(--header-top,theme(spacing.6))] w-full">
          <div className="mx-auto w-full max-w-7xl lg:px-8">
            <div className="relative px-4 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-2xl lg:max-w-5xl">
                <div className="relative flex gap-4">
                  <div className="flex flex-1">
                    <Link href="/" className="pointer-events-auto">
                      <Image
                        src="/images/logo.png"
                        alt="jpeggdev logo"
                        width={144}
                        height={144}
                        className="h-18 w-18 sm:h-36 sm:w-36 rounded-full object-cover border-2 border-blue/20 dark:border-blue-light/30 hover:border-blue/40 dark:hover:border-blue-light/50 transition-colors"
                        priority
                      />
                    </Link>
                  </div>
                  <div className="flex flex-1 justify-end md:justify-center">
                    {/* Desktop Navigation */}
                    <nav className="pointer-events-auto hidden md:block">
                      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                        {links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={`relative block px-3 py-2 transition ${
                                pathname === link.href
                                  ? "text-blue dark:text-blue-light"
                                  : "hover:text-blue dark:hover:text-blue-light"
                              }`}
                            >
                              {link.label}
                              {pathname === link.href && (
                                <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue/0 via-blue/40 to-blue/0 dark:from-blue-light/0 dark:via-blue-light/40 dark:to-blue-light/0" />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <div className="pointer-events-auto md:hidden">
                      <button
                        type="button"
                        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                      >
                        {isMenuOpen ? (
                          <svg
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-200"
                          >
                            <path d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="h-6 w-6 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-200"
                          >
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end md:flex-1">
                    <div className="pointer-events-auto">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-x-4 top-20 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
            <div className="flex flex-row-reverse items-center justify-between">
              <button
                type="button"
                className="pointer-events-auto rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6 stroke-zinc-500 dark:stroke-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-3">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`pointer-events-auto block py-2 transition ${
                        pathname === link.href
                          ? "text-blue dark:text-blue-light"
                          : "hover:text-blue dark:hover:text-blue-light"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}