module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "refactor", "test", "chore", "revert"],
    ],
    // 第一列最長50字元
    "header-max-length": [2, "always", 50],
    // 最短10個字元, 範例 TCG-00000 refresh balance
    "subject-min-length": [2, "always", "6"],
    // 不允許句號結尾
    "subject-full-stop": [2, "never", "."],
    // 不限制主題大小寫
    "subject-case": [0, "never"],
    // body 應該要有空白行
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 72],
  },
};
