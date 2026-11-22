import type { NextConfig } from "next";
import { nonCanonicalHosts, siteConfig } from "./src/lib/site";

const nextConfig: NextConfig = {
  async redirects() {
    return nonCanonicalHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${siteConfig.url}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;
