import type { Metadata } from "next";
import { Playfair_Display, Space_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

export const revalidate = 30; // Revalidate every 30 seconds to sync Sanity changes

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flintwell Interior Architecture",
  description: "Architecturally led interior design.",
};

import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";

// ... existing imports

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await client.fetch(FOOTER_QUERY);

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${spaceMono.variable}`}>
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
