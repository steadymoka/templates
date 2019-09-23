module.exports = {
  extends: [
    '@stdjs',
    '@stdjs/eslint-config/typescript',
  ],
  rules: {
    'array-bracket-newline': ['error', 'consistent'],
    'require-await': 'warn',
    'quotes': ['error', 'double'],
    'object-property-newline': ["error", { allowAllPropertiesOnSameLine: true }],
    '@typescript-eslint/camelcase': 'warn',
    '@typescript-eslint/no-var-requires': "off",
    '@typescript-eslint/no-non-null-assertion': 'warn',
  }
}
