import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
 
export default tseslint.config(
    eslint.configs.recommended,
    eslintPluginPrettierRecommended,
    reactRecommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json', './apps/*/tsconfig.json', './example/*/tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            ecmaVersion: 2024
        },
        rules: {
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "warn"
        }
    },
);