import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Pinned because there is an unrelated package-lock.json sitting in the
   * Windows home directory, and Turbopack was inferring *that* as the
   * workspace root. It watched the wrong tree, so edits under web/src
   * never triggered a rebuild — the dev server kept serving stale output.
   */
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
