import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PT_Serif } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Adibasa",
  description: "Adibasa adalah aplikasi untuk belajar bahasa jawa secara interaktif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${ptSerif.variable} antialiased relative`}
      >
        <div className="texture" />
        {children}
      </body>
    </html>
  );
}
