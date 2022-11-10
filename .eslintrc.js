module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['xo', 'prettier'],
  overrides: [
    {
      extends: ['plugin:react/recommended', 'xo', 'xo-typescript', 'plugin:prettier/recommended'],
      files: ['*.ts', '*.tsx'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },

          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            types: ['function'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },

          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
        ],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
          },
        ],

        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              null: false,
            },
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
