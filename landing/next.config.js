/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  rewrites: () => {
    return [{
      source: '/:any*',
      destination: '/'
    }]
  }
};

module.exports = nextConfig;
