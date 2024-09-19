const { i18n } = require('./next-i18next.config.cjs');

module.exports = {
  reactStrictMode: true,
  i18n,
  revalidate: 0,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
