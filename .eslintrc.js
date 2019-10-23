module.exports = {
  extends: ['react-native', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-use-before-define': 1,
    'react/prop-types': 1,
    'react/no-multi-comp': 1,
    'react/prefer-es6-class': 1,
    'react/prefer-stateless-function': 1,
    'react/no-array-index-key': 1,
    'react/no-string-refs': 1,
    'react/no-is-mounted': 1,
    'react/jsx-boolean-value': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-direct-mutation-state': 1,
    'react/no-set-state': 0,
    'react/no-typos': 0,
    'react/no-unescaped-entities': 1,
    'react/no-unsafe': 1,
    'react/no-unused-prop-types': 1,
    'react/require-render-return': 1,
    'react/jsx-no-undef': 1,
    'react-native/no-unused-styles': 2
  },
  globals: {
    fetch: false
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.native.js']
      }
    }
  }
};
