const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí puedes añadir más configuraciones de Next.js si es necesario
}

module.exports = withNextIntl(nextConfig)
