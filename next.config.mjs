/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    domains: [
      "programnotes.cn",
      "nav.programnotes.cn",
      "whitenoise.programnotes.cn"
    ],
  },
}

export default nextConfig
