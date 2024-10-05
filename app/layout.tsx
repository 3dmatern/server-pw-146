import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";

import "./globals.css";

import { Navbar } from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Perfect World 1.4.6",
  description: "Приватный сервер Perfect World 1.4.6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`
          mt-14
          ${geistSans.variable} ${geistMono.variable} antialiased
        `}
      >
        <header
          className="
            w-full h-14 flex items-center justify-center text-center absolute top-0 left-1/2
            -translate-x-1/2
          "
        >
          <Navbar />
        </header>

        {children}
      </body>
    </html>
  );
}
