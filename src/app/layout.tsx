import type { Metadata } from "next";
import { Caudex, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
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
    "Specialized in-home fitness and wellness programs for active adults living with Parkinson's disease and other movement disorders in Woodstock, Cherokee, and NW Metro Atlanta.",
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
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
