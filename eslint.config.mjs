// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  typescript: true,
  react: true,
  jsonc: false
}, {
  rules: {
    'no-console': 'warn',
    'unicorn/error-message': 'error',
    'antfu/curly': 'warn',
    'antfu/top-level-function': 'error',
    'style/brace-style': ['error', '1tbs'],
    'antfu/if-newline': 'off',
    'unused-imports/no-unused-vars': 'warn',
    'eslint-comments/no-unlimited-disable': 'off'
  },
})
