import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      'react/no-unescaped-entities': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-key": "warn",
      "*": "warn",
    },
  }),
]
 
export default eslintConfig