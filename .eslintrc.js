module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
    ],
    parserOptions: {
        project: ['tsconfig.eslint.json'],
    },
    env: {
        browser: true,
    },
    globals: {
        adguard: 'readonly',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        },
    },
    rules: {
        'no-shadow': 0,
        '@typescript-eslint/no-shadow': 0,
        'import/no-extraneous-dependencies': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/indent': ['error', 4],
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        'arrow-body-style': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'prefer-destructuring': 'off',
    },
};
