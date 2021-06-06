module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: ["babel-eslint", "vue-eslint"],
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": "always-multiline",
  },
};
