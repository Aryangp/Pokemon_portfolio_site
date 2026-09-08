import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323, Inter } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "TRAINER.DEV | Pokémon Developer Portfolio",
  description: "A retro Pokémon-themed developer portfolio set in Professor Oak's Research Lab. Explore starter projects, inspect Bill's PC box, and battle-ready web apps.",
  keywords: ["Developer Portfolio", "Pokemon Theme", "Retro Web Design", "Next.js", "Pixel Art", "Full Stack Developer"],
  authors: [{ name: "Trainer.dev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} ${inter.variable} antialiased h-full`}
    >
      <body className="h-full w-full bg-[#CBD5D0] text-[#1A202C] selection:bg-[#10B981] selection:text-white overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
