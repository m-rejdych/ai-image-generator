/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.dropbox.com'],
    remotePatterns: [
      {
        hostname: 'www.dropbox.com',
        port: '',
        protocol: 'https',
        pathname: '**',
      }
    ]
  },
}

module.exports = nextConfig
