/** @type {import('next').NextConfig} */
const nextConfig = {
  theme: {
    extend: {
      transitionProperty: {
        'padding-left': 'padding-left',
      },
    },
  },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
      },
      // productionBrowserSourceMaps: false,
      // optimizeFonts: false,
}

module.exports = nextConfig
