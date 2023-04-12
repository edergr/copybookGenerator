module.exports = {
  extends: [
    'eslint-config-airbnb-base/'
  ].map(require.resolve),
  rules: {
    'max-len': [2, 110, 2, {
      ignoreUrls: true,
      ignoreComments: false
    }],
    'no-lonely-if': 2,
    curly: 2,
    'no-console': 2,
    'func-names': 0,
    'consistent-return': 0,
    'comma-dangle': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-multiple-empty-lines': [
      'error', {
        max: 2,
        maxBOF: 0,
        maxEOF: 1
      }
    ],
    'no-bitwise': ['error', { int32Hint: true }],
    'import/no-extraneous-dependencies': [2, {}],
    'no-param-reassign': ['error', {
      props: false
    }],
    'require-atomic-updates': 'warn',
    'no-await-in-loop': 0
  }
};
