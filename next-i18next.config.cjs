module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
  },
  fallbackLng: 'en',
  localePath: require('path').resolve('./public/locales'),
  localeDetection: true,
};
