import type { Metadata } from "next";
import { publicPageUrl, siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as the full document title, without the brand suffix. */
  absoluteTitle?: boolean;
};

const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Time Strong Health — in-home fitness for older adults in Atlanta",
} as const;

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const brandedTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const url = publicPageUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [shareImage.url],
    },
  };
}
