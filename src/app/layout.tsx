import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satyam Raj | Software Engineer & AI Builder",
  description:
    "Building immersive digital experiences through code, AI, and interactive systems. Portfolio of Satyam Raj - Software Engineer, Frontend Developer, AI Builder, and Game Developer.",
  keywords: [
    "Satyam Raj",
    "Software Engineer",
    "Frontend Developer",
    "AI Builder",
    "Game Developer",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Satyam Raj" }],
  openGraph: {
    title: "Satyam Raj | Software Engineer & AI Builder",
    description:
      "Building immersive digital experiences through code, AI, and interactive systems.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
