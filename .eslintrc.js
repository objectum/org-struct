module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
    ],
    plugins: ['unused-imports'],
    env: {
        browser: true,
        jest: true,
    },
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2016, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    rules: {
        'unused-imports/no-unused-imports-ts': 2,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/ban-types': 'error',
        'no-param-reassign': 0,
        'no-return-await': 0,
        'consistent-return': 0,
        'import/no-cycle': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'no-undef': 0,
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': 0,
    },
    root: true,
    ignorePatterns: ['.eslintrc.js'],
}
