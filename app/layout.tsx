import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

import AudioProvider from "@/providers/AudioProvider";
import AuthProvider from "@/providers/AuthProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcastr",
  description: "Generate your podcasts using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <AudioProvider>
            <body className={`${manrope.className}`}>
              <Navbar />
              <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </body>
          </AudioProvider>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
