import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default defineConfig([
  { files: ["./app/**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    files: ["./app/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["./app/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  {
    files: ["./app/**/*.tsx", "**/*.jsx", "**/*.ts", "**/*.js"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "19",
      },
    },
  },
  pluginReact.configs.flat["jsx-runtime"],
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
]);
