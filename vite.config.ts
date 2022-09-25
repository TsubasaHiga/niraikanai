/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'path'
import { defineConfig, UserConfig } from 'vite'
import vitePluginGlobInput from '@macropygia/vite-plugin-glob-input'

// isProduction
const isProduction = process.env.NODE_ENV === 'production'

// root
const root = 'src/'

// publicDir
const publicDir = '../public'

// https://vitejs.dev/config/
const config: UserConfig = {
  root: root,
  publicDir: publicDir,
  envDir: '../',
  server: {
    host: true,
    port: 3000
  },
  css: {
    devSourcemap: !isProduction
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '~/': path.join(__dirname, root)
    }
  },
  plugins: [
    vitePluginGlobInput({
      patterns: path.resolve(__dirname, root, '**/*.html')
    })
  ]
}

if (isProduction) {
  config.esbuild = {
    drop: ['console', 'debugger']
  }
}

export default defineConfig(config)
