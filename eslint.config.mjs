// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            ecmaVersion: 5,
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            "prettier/prettier": [
            "error",
            {
                "arrowParens": "avoid",
                "bracketSpacing": true,
                "htmlWhitespaceSensitivity": "css",
                "insertPragma": false,
                "jsxBracketSameLine": false,
                "jsxSingleQuote": true,
                "printWidth": 80,
                "proseWrap": "always",
                "quoteProps": "as-needed",
                "requirePragma": false,
                "semi": true,
                "singleQuote": true,
                "tabWidth": 2,
                "trailingComma": "all",
                "useTabs": false
              }
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
        },
    },
);
