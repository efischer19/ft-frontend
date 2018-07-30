module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    '@vue/airbnb',
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-default-prop': 'off', // hard to test, and nonsensical in most cases for my app
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
