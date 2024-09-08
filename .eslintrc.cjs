module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          {
            pattern: '#/components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '#/hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '#/util/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '#/api/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '#/constants/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '#/types/**',
            group: 'internal',
            position: 'after',
          },
        ],

        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': 'error',
  },
};
