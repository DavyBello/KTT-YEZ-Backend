module.exports = {
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'import',
  ],
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-tabs': 0,
    'func-names': 0,
    'global-require': 0,
    'no-param-reassign': 0,
  },
  env: {
    node: true,
  },
};
