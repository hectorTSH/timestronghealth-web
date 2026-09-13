import type { Metadata } from "next";
import { Caudex, Source_Sans_3 } from "next/font/google";
import { ViewTransition } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
    default: `${siteConfig.name} | In-Home Fitness & Wellness for Parkinson's`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Specialized in-home fitness and wellness programs for active adults living with Parkinson's disease and other movement disorders in Buckhead, Midtown, Sandy Springs, and Woodstock.",
  metadataBase: new URL("https://www.timestronghealth.com"),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
    locale: "en_US",
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
