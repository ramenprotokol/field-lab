/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static-first: emit a fully static site into ./out for Cloudflare Pages.
  output: "export",
  // Cloudflare Pages serves /path/ as /path/index.html — trailing slashes keep
  // relative asset URLs and direct-link routing stable.
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; this site ships no <Image> but the
    // flag keeps any future use export-safe.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
