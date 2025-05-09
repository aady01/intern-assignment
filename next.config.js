/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Suppress hydration warnings caused by browser extensions like DarkReader
  // that inject style-related attributes
  webpack: (config) => {
    return config;
  },
  // Add this to ignore specific attributes during hydration mismatch checking
  experimental: {
    suppressHydrationWarning: true,
  },
};

module.exports = nextConfig;
