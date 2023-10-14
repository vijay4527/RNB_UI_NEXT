/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "https://localhost:7189/api",
  },
};

module.exports = nextConfig;
