/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dropbox.com'],
    remotePatterns: [
      {
        hostname: '**.dropbox.com',
        protocol: 'https',
      }
    ]
  },
}

module.exports = nextConfig
