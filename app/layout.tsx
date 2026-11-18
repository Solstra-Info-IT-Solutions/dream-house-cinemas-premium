import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dream House Cinemas | Film Production & Equipment Rental",
  description: "Dream House Cinemas — film and video production with professional cinema camera, lens, lighting and grip equipment rental.",
  metadataBase: new URL("https://dreamhousecinemas.in"),
  openGraph: { title: "Dream House Cinemas", description: "Film production and cinema equipment rental.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className={`${dmSans.variable} ${playfair.variable}`}>{children}</body></html>;
}
