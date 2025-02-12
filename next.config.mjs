/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "programnotes.cn",
      "nav.programnotes.cn"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
