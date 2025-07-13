import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AgentOpsProvider } from "@/components/AgentOpsProvider";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import MicrosoftClarity from '@/components/MicrosoftClarity';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jpeggdev - Developer & AI Enthusiast",
  description: "Personal website of jpeggdev - showcasing development work and insights on AI and technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground transition-colors`}
      >
        <AgentOpsProvider apiKey={process.env.NEXT_PUBLIC_AGENTOPS_API_KEY}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed inset-0 flex justify-center sm:px-8">
              <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full bg-card ring-1 ring-border" />
              </div>
            </div>
            <div className="relative flex w-full flex-col">
              <Navigation />
              <main className="flex-auto">
                <div className="sm:px-8 mt-16 sm:mt-32 mb-16 sm:mb-32">
                  <div className="mx-auto w-full max-w-7xl lg:px-8">
                    <div className="relative px-4 sm:px-8 lg:px-12">
                      <div className="mx-auto max-w-2xl lg:max-w-5xl">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <Analytics />
            {process.env.NEXT_PUBLIC_GA_ID && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
            )}
            <MicrosoftClarity />
          </ThemeProvider>
        </AgentOpsProvider>
      </body>
    </html>
  );
}
