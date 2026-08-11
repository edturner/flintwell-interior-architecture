import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

// Ian's body face — the reading voice.
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// Geometric sans for the tracked-out lowercase labels. Also standing in for
// Noah on the wordmark until the licensed webfont arrives — see
// --font-wordmark in globals.css.
const jost = Jost({
  weight: ["300", "400"],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flintwell — Interior Architecture",
  description: "Flintwell Interior Architecture. A new site is in progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>{children}</body>
    </html>
  );
}
