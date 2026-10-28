import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Allow every crawler, including AI crawlers and Meta's external agent.
 * Each named agent is listed explicitly so a previous Disallow cannot linger.
 */
const allowedCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "meta-externalagent",
  "*",
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: allowedCrawlers.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
