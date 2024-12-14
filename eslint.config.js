import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

export default tseslint
  .config(
    { ignores: ["dist"] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ["**/*.{js,ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
        import: importPlugin,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        "import/no-unresolved": "warn",
        "no-unused-vars": [
          "warn",
          { vars: "all", args: "after-used", ignoreRestSiblings: true },
        ],
        "import/no-unused-modules": ["warn", { unusedExports: true }],
      },
    }
  )
  .concat(eslintPluginPrettier);
