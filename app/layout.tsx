import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
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
  return <html lang="en"><body className={playfairDisplay.variable}>{children}</body></html>;
}
