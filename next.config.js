/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = {
  //output: 'export',
  trailingSlash: true,
  compress: true,
  reactStrictMode: false,
  useFileSystemPublicRoutes: true,
  basePath:'',
  images: {
    unoptimized: true,
    minimumCacheTTL: 2000,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
}