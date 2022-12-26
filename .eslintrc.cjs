module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'es2022': true,
  },
  'root': true,
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'settings': {
    'react': {
      'version': '18',
    },
  },
  'rules': {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/prop-types': ['off'],
    'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'always' }],
    'react/jsx-no-useless-fragment': ['error'],
    'prefer-arrow-callback': ['error'],
    'no-undef': ['error'],
    'semi': 'off',
    'no-duplicate-imports': ['error'],
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-spaces': ['error'],
    'camelcase': ['error'],
    'arrow-parens': ['error', 'as-needed'],
    'no-var': ['error'],
    'prefer-const': ['error'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'new-cap': ['error', { 'capIsNew': false }],
    'space-before-blocks': ['error'],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'MemberExpression': 'off',
    }],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
  },
};
