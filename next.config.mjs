/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // images.domains 已废弃，改用 remotePatterns
    remotePatterns: [
      { protocol: "https", hostname: "programnotes.cn" },
      { protocol: "https", hostname: "nav.programnotes.cn" },
      { protocol: "https", hostname: "whitenoise.programnotes.cn" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 本地 next dev / next start 时转发；线上以 edgeone.json 为准
  async rewrites() {
    return [
      { source: "/favicon/:domain.ico", destination: "https://icons.duckduckgo.com/ip3/:domain.ico" },
      { source: "/translate", destination: "https://deeplx.ai-2b9.workers.dev/translate" },
    ]
  },
  async redirects() {
    return [
      { source: "/page/cursor-guide", destination: "/page/cursor", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ]
  },
}

export default nextConfig
