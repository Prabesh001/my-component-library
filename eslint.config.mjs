import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
    rules: {
      "prefer-arrow-callback": ["warn"],
      "prefer-template": ["warn"],
      quotes: ["warn", "double"],

      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-confusing-non-null-assertion": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }),
];

export default eslintConfig;
