import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import eslintPluginReact from "@eslint-react/eslint-plugin";
import eslintPluginStylistic from "@stylistic/eslint-plugin";
import { configs, parser } from "typescript-eslint";
import { defineConfig } from "eslint/config";

const config = defineConfig([
  {
    extends: [configs.recommendedTypeChecked],
    files: ["**/*.{ts,tsx}"],
    ignores: [
      ".next/**",
      "build/**",
      "eslint.config.ts",
      "jest.config.ts",
      "next-env.d.ts",
      "node_modules/**",
      "out/**",
    ],
    languageOptions: {
      parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@eslint-react": eslintPluginReact,
      "@stylistic": eslintPluginStylistic,
      import: eslintPluginImport,
      perfectionist: eslintPluginPerfectionist,
    },
    rules: {
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
        {
          message: "Use template literal `${value}` instead of String(value).",
          selector: "CallExpression[callee.name='String']",
        },
        {
          message: "Use unary plus +value instead of Number(value).",
          selector: "CallExpression[callee.name='Number']",
        },
        {
          message: "Use the rgba() helper instead of raw rgba() strings.",
          selector: "Literal[value=/rgba\\(/u]",
        },
        {
          message: "Use the rgba() helper instead of raw rgba() strings.",
          selector: "TemplateElement[value.raw=/rgba\\(/u]",
        },
        {
          message: "Use a color variable from theme instead of a raw hex code.",
          selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/u]",
        },
      ],
      "no-trailing-spaces": "error",
      "no-unused-vars": "off",

      "@eslint-react/dom-no-missing-button-type": "error",
      "@eslint-react/dom-no-string-style-prop": "error",
      "@eslint-react/dom-no-unknown-property": "error",
      "@eslint-react/dom-no-unsafe-target-blank": "error",
      "@eslint-react/jsx-no-key-after-spread": "error",
      "@eslint-react/naming-convention-context-name": "error",
      "@eslint-react/naming-convention-id-name": "error",
      "@eslint-react/naming-convention-ref-name": "error",
      "@eslint-react/no-access-state-in-setstate": "error",
      "@eslint-react/no-array-index-key": "error",
      "@eslint-react/no-class-component": "error",
      "@eslint-react/no-context-provider": "error",
      "@eslint-react/no-direct-mutation-state": "error",
      "@eslint-react/no-duplicate-key": "error",
      "@eslint-react/no-implicit-key": "error",
      "@eslint-react/no-missing-key": "error",
      "@eslint-react/no-use-context": "error",
      "@eslint-react/rules-of-hooks": "error",
      "@eslint-react/set-state-in-effect": "error",
      "@eslint-react/set-state-in-render": "error",
      "@eslint-react/use-state": "error",
      "@eslint-react/web-api-no-leaked-event-listener": "error",
      "@eslint-react/web-api-no-leaked-interval": "error",
      "@eslint-react/web-api-no-leaked-resize-observer": "error",
      "@eslint-react/web-api-no-leaked-timeout": "error",

      "@stylistic/comma-dangle": [
        "error",
        {
          arrays: "always-multiline",
          objects: "always-multiline",
          imports: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
          importAttributes: "always-multiline",
          dynamicImports: "always-multiline",
          enums: "never",
          generics: "never",
          tuples: "never",
        },
      ],
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

      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "_", varsIgnorePattern: "_" },
      ],
      "@typescript-eslint/restrict-template-expressions": "off",

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
              elementNamePattern: ["^devices.pointerCoarse"],
              groupName: "devices.pointerCoarse",
            },
            {
              elementNamePattern: ["\\$\\{devices\\.pointerCoarse\\}"],
              groupName: "devices.mobileAndPointerCoarse",
            },
            {
              elementNamePattern: ["^devices.mobileXs"],
              groupName: "devices.mobileXs",
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
            "devices.pointerCoarse",
            "devices.mobileAndPointerCoarse",
            "devices.mobileXs",
            "devices.mobile",
            "devices.tablet",
            "devices.desktop",
            "devices.desktopLg",
            "devices.desktopXl",
          ],
        },
      ],
      "perfectionist/sort-union-types": "error",
    },
  },
  {
    files: ["src/theme/utils/rgba.ts", "src/theme/variables/colors.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default config;
