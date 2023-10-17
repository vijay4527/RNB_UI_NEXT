/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "scontent.cdninstagram.com",
      "www.goodmorningimagesdownload.com",
      "ribbonsandballoons.com",
      "static.vecteezy.com",
    ],
  },
  env: {
    API_URL: "https://localhost:7189/api",
  },
};

module.exports = nextConfig;
