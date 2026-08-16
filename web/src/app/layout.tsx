import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { SITE_DETAILS_QUERY } from "@/sanity/lib/queries";
import type { SiteDetails } from "@/sanity/contentTypes";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/**
 * An hour, not 30 seconds. This is a brochure site for a studio that
 * publishes a project every few months; regenerating every 30s burned ISR
 * regenerations continuously *and* still made Ian wait after an edit.
 * `/api/revalidate` is the real answer — a Sanity webhook pushes changes
 * through instantly, and this is only the safety net behind it.
 */
export const revalidate = 3600;

// Serif — statements, body copy, quotes, nav. Ian's own body face.
// Weight 400 only: nothing in the stylesheets sets 300 or 500 on the serif,
// and each declared weight is a font file downloaded on first load.
// Italic earns its place on the form placeholders (Contact.module.css).
const cormorant = Cormorant_Garamond({
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  subsets: ["latin"],
});

// Geometric sans — the tracked-out lowercase labels throughout the mockups.
// Every sans usage on the site sets `font-weight: 300`; 400 was never used.
const jost = Jost({
  weight: ["300"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Required for the relative OpenGraph image URLs on project pages to
  // resolve to absolute ones.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flintwell Interior Architecture",
    template: "%s — Flintwell Interior Architecture",
  },
  description: "Architecturally led interior design.",
  openGraph: {
    siteName: "Flintwell Interior Architecture",
    locale: "en_GB",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerData = await client.fetch<SiteDetails | null>(SITE_DETAILS_QUERY);

  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${jost.variable}`}>
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}
