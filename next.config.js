const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withNextIntl(nextConfig)

module.exports = {
    experimental: {
      runtime: 'nodejs',  // Cambiar el runtime a Node.js en lugar de Edge
    },
  };