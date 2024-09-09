module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['en', 'ko'],
  },
  fallbackLng: 'ko',
  localePath: require('path').resolve('./public/locales'),
  localeDetection: true,
};
