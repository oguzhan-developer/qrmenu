/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
    staleTimes:{
      dynamic:0,
      static:0,
    }
  },
  output: "standalone",
};

module.exports = nextConfig;
