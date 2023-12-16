/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dropbox.com'],
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
