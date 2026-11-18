import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream House Cinemas | Stories Worth Feeling",
  description: "Dream House Cinemas — cinematic production, visual storytelling, film production, commercial films and creative services.",
  metadataBase: new URL("https://dreamhousecinemas.in"),
  openGraph: { title: "Dream House Cinemas", description: "Stories worth feeling.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}