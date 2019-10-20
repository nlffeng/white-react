module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js',
    '!src/*/*/Loadable.{js,jsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    }
  },
  moduleDirectories: [
    'node_modules',
    'src',
  ],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/jest/cssMock.js',
    '.*\\.(jpg|jpeg|png|gif|eof|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/fileMock.js',
  },
  testRegex: '_tests_/.*\\.test\\.(js|jsx)$',
}
