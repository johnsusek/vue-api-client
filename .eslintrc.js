module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'comma-dangle': ["error", "never"],
    'no-param-reassign': "off",
    'consistent-return': "off",
    'no-new': "off",
    'no-alert': "off",
    'no-empty': "off",
    'prefer-const': "off",
    'vue/require-default-prop': "off",
    'vue/require-prop-types': "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/html-closing-bracket-newline": [ "error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 999,
      "multiline": {
        "max": 999,
        "allowFirstLine": false
      }
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
