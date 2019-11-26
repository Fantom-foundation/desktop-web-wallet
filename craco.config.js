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
  jest: {
    configure: {
      // preset: 'ts-jest',
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^.+\\.scss$': 'identity-obj-proxy',
        // '\\.scss$': '<rootDir>/.jest/proxy.ts',
      },
      snapshotSerializers: ['enzyme-to-json/serializer'],
      // snapshotSerializers: ['enzyme-to-json/serializer'],
      moduleFileExtensions: ['js', 'json', 'ts', 'tsx', 'jsx', 'node'],
      verbose: true,
      roots: ['<rootDir>/src'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.ts?$': 'babel-jest',
        '^.+\\.js?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
      },
      preset: 'ts-jest/presets/js-with-ts',
      // preset: 'js-with-babel',
      testEnvironment: 'node',
      // transformIgnorePatterns: ['<rootDir>/node_modules/'],
      // globals: {
      //   __TS_CONFIG__: {
      //     module: 'commonjs',
      //     jsx: 'react',
      //     allowJs: true,
      //   },
      //   'ts-jest': {
      //     tsConfig: {
      //       module: 'commonjs',
      //       jsx: 'react',
      //       allowJs: true,
      //     },
      //   },
      // },
    },
  },
};
