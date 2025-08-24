import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import {
  Geist,
  Geist_Mono,
  Orbitron,
  Press_Start_2P,
  Rajdhani,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "Gamez24",
  description: "Best and latest free Game deals for everyone!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${orbitron.variable} ${pressStart.variable} ${rajdhani.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Footer */}
        <footer className="text-sm text-gray-400 text-center py-10 bg-secondary mt-5">
          &copy; {new Date().getFullYear()} Gamez24. All rights reserved
          <div className="mt-2">
            <Link
              href="/privacyPolicy"
              className="hover:underline hover:text-gray-300"
            >
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/tos" className="hover:underline hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
