import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { SITE_DETAILS_QUERY } from "@/sanity/lib/queries";
import "./globals.css";

export const revalidate = 30; // Revalidate every 30 seconds to sync Sanity changes

// Serif — statements, body copy, quotes, nav. Ian's own body face.
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  subsets: ["latin"],
});

// Geometric sans — the tracked-out lowercase labels throughout the mockups.
const jost = Jost({
  weight: ["300", "400"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flintwell Interior Architecture",
  description: "Architecturally led interior design.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await client.fetch(SITE_DETAILS_QUERY);

  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
