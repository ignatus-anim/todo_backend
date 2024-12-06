import globals from "globals";
import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    // Define language options and globals
    languageOptions: {
      ecmaVersion: 2021, // Support ES2021 syntax
      globals: {
        ...globals.node, // Node.js globals
        ...globals.jest, // Jest globals
      },
    },
    plugins: {
      jest: jestPlugin, // Jest plugin as an object
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Use Jest's recommended rules
    },
  },
  // ESLint's base recommended rules
  pluginJs.configs.recommended,
];
