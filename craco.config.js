// craco.config.js
// const { paths } = require('@craco/craco')

// console.log(paths);

module.exports = {
  webpack: {
    alias: {
      // Another example for using a wildcard character
      '~': `src`,
    },
  },
  eslint: {
    enable: false,
    mode: 'file',
  },
};
