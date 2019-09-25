module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never']
  }
}
