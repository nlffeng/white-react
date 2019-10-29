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
    node: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'operator-linebreak': ['error', 'after'],
    'space-before-function-paren': ['error', {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always",
    }],
  }
}
