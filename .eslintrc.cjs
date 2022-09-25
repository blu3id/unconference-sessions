module.exports = {
    env: {
        es6: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.svelte'],
    },
    plugins: [
        'svelte3',
        '@typescript-eslint'
    ],
    ignorePatterns: ['.eslintrc.*', 'vite.config.*', 'svelte.config.*', 'dist/*', 'node_modules/*'],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3',
            rules: {
                'import/first': "off",
                'import/no-duplicates': "off",
                'import/no-mutable-exports': "off",
                'import/prefer-default-export': "off",
                'no-multiple-empty-lines': "off",
            }
        }
    ],
    settings: {
        'svelte3/typescript': true,
        'svelte3/ignore-styles': () => true
    }
};