import {defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/web_app/',
  plugins: [vue()]
})