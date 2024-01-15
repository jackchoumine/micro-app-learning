/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-08 14:38:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-15 10:48:31
 * @Description : prettier 配置
 */
module.exports = {
  singleQuote: true,
  semi: false,
  arrowParens: 'avoid',
  bracketSameLine: true,
  printWidth: 90,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  // 依赖分组
  importOrder: [
    // 外部依赖 从 node_modules 加载的依赖

    // 基础库依赖
    '^#/(.*)$',
    '^#gis/(.*)$',
    // 项目里的依赖
    '^@/(.*)$',
    '^@m/(.*)$',
    '^../(.*)',
    // 本地依赖
    '^./((?!scss).)*$',
    '^./(.*)',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // overrides: [
  //   {
  //     files: ['*.css', '.scss', '.sass'],
  //     options: { singleQuote: true },
  //   },
  // ],
}

/**
 * 相关依赖
 *  "@trivago/prettier-plugin-sort-imports": "^4.3.0",
    "prettier": "^3.2.2",
 */
