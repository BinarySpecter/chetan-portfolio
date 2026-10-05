import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress, SkipLink, ThemeInitScript } from "@/components/layout/Chrome";
import { CursorDotField } from "@/components/ui/CursorDotField";
import { buildMetadata, personJsonLd } from "@/lib/seo";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efea" },
    { media: "(prefers-color-scheme: dark)", color: "#171516" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrument.variable}`}
    >
      <head>
        <ThemeInitScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <CursorDotField />
        <a id="top" className="fixed top-0" aria-hidden="true" />
        <SkipLink />
        <ScrollProgress />
        <span className="grain" aria-hidden="true" />
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
