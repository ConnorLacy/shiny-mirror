/*
    Custom Linting provided by @verydanny eslint-plugin-verydanny. Used to 
    standardize code formatting and enforce applied rules
*/

module.exports = {
  // Enables a subset of rules
  extends: [
    'plugin:verydanny/typescript',
    'plugin:verydanny/typescript-tsconfig-checking',
    'plugin:verydanny/react',
    'plugin:verydanny/node',
    'plugin:verydanny/jest',
    'plugin:verydanny/prettier', 
  ],

  /*
        Changing default parser from Espree to ts-config. This is a dev-dependency
        we added and configured for TypeScript
    */
  parserOptions: {
    project: 'tsconfig.json',
  },
  rules: {
    // ES6
    'callback-return': 'off',
    'func-style': 'off',
    'require-atomic-updates': 'off',

    // Jest
    'jest/valid-expect-in-promise': 'off',
    'jest/require-tothrow-message': 'off',

    // File resolution
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'error',

    // JSX Ally
    'jsx-a11y/control-has-associated-label': 'off',

    // React
    'react/display-name': 'off',

    // Node
    'node/no-extraneous-require': 'off',

    // TypeScript
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/prefer-readonly': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/await-thenable': 'off',

    // Prettier must be last
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        trailingComma: 'all',
        singleQuote: true,
        semi: false,
      },
    ],
  },
}
