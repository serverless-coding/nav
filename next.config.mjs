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
