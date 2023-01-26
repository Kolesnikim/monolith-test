module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'object-curly-newline': 'off',
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off',
    'prefer-object-spread': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
