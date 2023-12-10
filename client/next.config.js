/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.dropbox.com',
        port: '',
        protocol: 'https',
        pathname: '**',
      }
    ]
  }
}

module.exports = nextConfig
