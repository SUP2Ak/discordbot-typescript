import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
const baseConfig = [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

export default [
  ...baseConfig,
  { ignores: ["*/.js", "*.js", "node_modules", "dist"] },
  { rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "warn",
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"],
      "arrow-parens": ["warn", "always"],
      "import/prefer-default-export": "off",
    },
  },
];