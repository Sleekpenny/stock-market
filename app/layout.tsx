import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Market",
  description: "Track real time stock prices, get personalized alerts and eplore detailed company insights.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className={cn("min-h-full flex flex-col", GeistSans.className)}>{children}
      <Toaster />
      </body>
    </html>
  );
}
