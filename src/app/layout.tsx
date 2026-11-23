import type { Metadata } from "next";
import { Caudex, Source_Sans_3 } from "next/font/google";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const caudex = Caudex({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-caudex",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `In-Home Personal Trainer Atlanta | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "In-home fitness for older adults in Atlanta, including Parkinson's fitness. Private-pay, one-on-one sessions in the client's home across Buckhead, Midtown, Sandy Springs, and Woodstock.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${caudex.variable} ${sourceSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <JsonLd />
        <ThemeProvider>
          <Header />
          <ViewTransition>
            <main className="page-enter flex-1">{children}</main>
          </ViewTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
