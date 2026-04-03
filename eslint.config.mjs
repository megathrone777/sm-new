import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import eslintPluginReactDom from "eslint-plugin-react-dom";
import eslintPluginReactNamingConvention from "eslint-plugin-react-naming-convention";
import eslintPluginReactX from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import { configs, parser } from "typescript-eslint";

const config = defineConfig({
  extends: [configs.recommended],
  ignores: [
    "eslint.config.mjs",
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ],
  languageOptions: {
    parser,
  },
  plugins: {
    "@stylistic": eslintPluginStylistic,
    import: eslintPluginImport,
    perfectionist: eslintPluginPerfectionist,
    "react-dom": eslintPluginReactDom,
    "react-naming-convention": eslintPluginReactNamingConvention,
    "react-x": eslintPluginReactX,
  },
  rules: {
    "@stylistic/indent": [
      "error",
      2,
      {
        ignoredNodes: [
          "JSXExpressionContainer > ConditionalExpression",
          "JSXExpressionContainer > LogicalExpression",
          "TemplateLiteral *",
        ],
        offsetTernaryExpressions: true,
      },
    ],
    "@stylistic/jsx-closing-bracket-location": "error",
    "@stylistic/jsx-closing-tag-location": "error",
    "@stylistic/jsx-curly-brace-presence": "error",
    "@stylistic/jsx-curly-newline": "error",
    "@stylistic/jsx-curly-spacing": "error",
    "@stylistic/jsx-first-prop-new-line": "error",
    "@stylistic/jsx-indent-props": ["error", { indentMode: 2 }],
    "@stylistic/jsx-max-props-per-line": ["error", { maximum: 2 }],
    "@stylistic/jsx-tag-spacing": "error",
    "@stylistic/quotes": ["error", "double"],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "_", varsIgnorePattern: "_" },
    ],
    "func-style": ["error", "expression"],
    "import/named": "off",
    "import/newline-after-import": "error",
    "import/order": "off",
    "newline-after-var": "error",
    "newline-before-return": "error",
    "no-inline-comments": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-restricted-syntax": [
      "error",
      "FunctionDeclaration",
      {
        message: "Avoid raw degree symbol in string literals. Use '\\u00B0'.",
        selector: "Literal[value=/°/u][raw!=/\\\\u00B0/u]",
      },
      {
        message: "Avoid raw degree symbol in template literals. Use '\\u00B0'.",
        selector: "TemplateElement[value.raw=/°/u]",
      },
    ],
    "no-trailing-spaces": "error",
    "no-unused-vars": "off",
    "perfectionist/sort-enums": "error",
    "perfectionist/sort-exports": "error",
    "perfectionist/sort-imports": [
      "error",
      {
        customGroups: [
          {
            elementNamePattern: ["^react$", "^react-.*"],
            groupName: "type-react",
            selector: "type",
          },
          {
            elementNamePattern: ["^react$", "^react-.*"],
            groupName: "react",
          },
          {
            elementNamePattern: ["^@/.+"],
            groupName: "internal-alias",
          },
          {
            elementNamePattern: ["\\.css$"],
            groupName: "style",
          },
        ],
        groups: [
          "builtin",
          { newlinesBetween: 1 },
          "react",
          { newlinesBetween: 0 },
          "external",
          { newlinesBetween: 1 },
          "internal-alias",
          { newlinesBetween: 1 },

          "parent",
          { newlinesBetween: 1 },
          "sibling",
          { newlinesBetween: 1 },
          "index",
          { newlinesBetween: 1 },
          "import",
          { newlinesBetween: 1 },

          "style",
          { newlinesBetween: 1 },

          "type-react",
          { newlinesBetween: 0 },
          "type-external",
          { newlinesBetween: 0 },
          "type-internal",
          { newlinesBetween: 0 },
          "type-parent",
          { newlinesBetween: 0 },
          "type-sibling",
          { newlinesBetween: 0 },
          "type-index",
          { newlinesBetween: 1 },
          "type-import",
          { newlinesBetween: 1 },
        ],
        internalPattern: ["^@/.+"],
        newlinesBetween: 1,
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-interfaces": "error",
    "perfectionist/sort-jsx-props": "error",
    "perfectionist/sort-named-exports": "error",
    "perfectionist/sort-object-types": "error",
    "perfectionist/sort-objects": [
      "error",
      {
        type: "natural",
        order: "asc",
        customGroups: [
          {
            elementNamePattern: ["^&"],
            groupName: "current",
          },
          {
            elementNamePattern: ["^:"],
            groupName: "pseudo",
          },
          {
            elementNamePattern: ["^@"],
            groupName: "media",
          },
          {
            elementNamePattern: ["^devices.mobile"],
            groupName: "devices.mobile",
          },
          {
            elementNamePattern: ["^devices.tablet"],
            groupName: "devices.tablet",
          },
          {
            elementNamePattern: ["^devices.desktop"],
            groupName: "devices.desktop",
          },
          {
            elementNamePattern: ["^devices.desktopLg"],
            groupName: "devices.desktopLg",
          },
          {
            elementNamePattern: ["^devices.desktopXl"],
            groupName: "devices.desktopXl",
          },
        ],
        groups: [
          "unknown",
          "current",
          "pseudo",
          "media",
          "devices.mobile",
          "devices.tablet",
          "devices.desktop",
          "devices.desktopLg",
          "devices.desktopXl",
        ],
      },
    ],

    "perfectionist/sort-union-types": "error",
    "prefer-const": "error",
    quotes: "error",
    "react-dom/no-missing-button-type": "error",
    "react-dom/no-string-style-prop": "error",
    "react-naming-convention/context-name": "error",
    "react-naming-convention/id-name": "error",
    "react-naming-convention/ref-name": "error",
    "react-x/jsx-key-before-spread": "error",
    "react-x/jsx-shorthand-boolean": "error",
    "react-x/jsx-shorthand-fragment": "error",
    "react-x/no-array-index-key": "error",
    "react-x/no-class-component": "error",
    "react-x/no-context-provider": "error",
    "react-x/no-duplicate-key": "error",
    "react-x/no-missing-key": "error",
    semi: "error",
  },
});

export default config;
