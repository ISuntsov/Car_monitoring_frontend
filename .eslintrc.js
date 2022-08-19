module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        semi: [1, 'always'],
        indent: [0, 4],
        'space-before-function-paren': [
            'warn',
            { anonymous: 'always', named: 'never' }
        ],
        quotes: [
            'warn',
            'single',
            {
                allowTemplateLiterals: true,
                avoidEscape: true
            }
        ],
        'no-trailing-spaces': [
            'warn',
            {
                skipBlankLines: true,
                ignoreComments: true
            }
        ],
        'multiline-ternary': ['off']
    }
};
