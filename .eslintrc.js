module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es6: true
    },
    extends: [
      'airbnb-base',
      'plugin:react/recommended'
    ],
    plugins: [
      'react',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
      ecmaVersion: 2018,
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        pragma: "React",
        version: "16.13.1"
      },
    },
    parser: 'babel-eslint',
    rules: {
      'styled-components-config/rule-name': 2,
      'eol-last': ['error', 'always'],
      semi: ['error', 'always'],
      'no-plusplus': 'off',
      'linebreak-style': 'off',
      'operator-linebreak': 'off',
      'comma-dangle': 'off',
      'no-console': 'off',
      'prefer-destructuring': 'off',
      'arrow-parens': 'off',
      'arrow-body-style': 'off',
      'object-curly-newline': 'off',
      'no-use-before-define': 'off',
      'no-shadow': 'off',
      'space-before-function-paren': 'off',
      'no-restricted-syntax': 'off',
      'react/no-unescaped-entities': 'off',
      'styled-components-config/rule-name': 'off',
      camelcase: 'off',
      'no-nested-ternary': 'off',
      'guard-for-in': 'off',
      CssSyntaxError: 'off',
      'no-continue': 'off',
      'no-bitwise': 'off',
      'no-restricted-globals': 'off',
      'import/prefer-default-export': 'off'
    }
  };
  