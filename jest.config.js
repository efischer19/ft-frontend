module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    'jest-localstorage-mock',
  ],
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '<rootDir>/(tests/**/*.spec.(js|jsx))',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!*config*',
    '!dist/*',
    '!coverage/**',
    '!src/main.js',
  ],
  coverageThreshold: {
    global: {
      statements: 97,
    },
  },
};
