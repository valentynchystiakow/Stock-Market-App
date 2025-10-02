// imports required modules and components
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import {Toaster} from "@/components/ui/sonner";

// creates font variables for Geist Sans and Geist Mono
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// creates and exports metadata for the app
export const metadata: Metadata = {
  title: "Signalist",
  description: "Track real-time stock market signals, get personalized alerts and company insights",
};


// creates and exports a root layout component - main layout for the app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className = "dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      <Toaster/>
      </body>
    </html>
  );
}
