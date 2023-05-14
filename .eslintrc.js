module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  ignorePatterns: ["cypress/**/*"],
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "@vue/prettier",
  ],
  parserOptions: {
    parser: ["babel-eslint", "vue-eslint"],
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
