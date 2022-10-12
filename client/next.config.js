/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.website-files.com", "uploads-ssl.webflow.com", "css-tricks.com"]
  },
}
module.exports = nextConfig
