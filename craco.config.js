module.exports = {
  webpack: {
    alias: {
      '~': `src`,
    },
    output: {
      publicPath: '/',
    },
  },
  eslint: {
    enable: false,
    mode: 'file',
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/src/$1',
        '^.+\\.scss$': 'identity-obj-proxy',
      },
      snapshotSerializers: ['enzyme-to-json/serializer'],
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
      testEnvironment: 'node',
    },
  },
};
