/* eslint-disable @next/next/no-page-custom-font -- App Router global font loading belongs in the root layout. */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream House Cinemas | Film Production & Equipment Rental",
  description: "Dream House Cinemas — film and video production with professional cinema camera, lens, lighting and grip equipment rental.",
  metadataBase: new URL("https://dreamhousecinemas.in"),
  openGraph: { title: "Dream House Cinemas", description: "Film production and cinema equipment rental.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
