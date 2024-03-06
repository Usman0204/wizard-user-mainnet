/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
     new webpack.ProvidePlugin({
     $: 'jquery',
     jQuery: 'jquery',
     'window.jQuery': 'jquery',
  }));
 return config;
}
}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/components/:slug', 
      },
    ];
  },
};

// module.exports = nextConfig





