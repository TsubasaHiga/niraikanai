import path from 'path'
import { defineConfig, UserConfig, splitVendorChunkPlugin } from 'vite'
import vitePluginGlobInput from '@macropygia/vite-plugin-glob-input'
import handlebars from 'vite-plugin-handlebars'
import { commonConfig } from './src/siteConfig'
import { GetPageData } from './src/pageData'
import helpers from 'handlebars-helpers'

// isProduction
const isProduction = process.env.NODE_ENV === 'production'

// root
const root = 'src/'

// publicDir
const publicDir = '../public'

// handlebarsContext
const handlebarsContext = {
  isProduction: isProduction,
  ...commonConfig
}

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
  esbuild: {
    jsxFactory: 'h'
  },
  resolve: {
    alias: {
      '~/': path.join(__dirname, root)
    }
  },
  plugins: [
    splitVendorChunkPlugin(),
    vitePluginGlobInput({
      patterns: [
        path.resolve(__dirname, root, '**/*.html'),
        // src/html-partialsは除く
        `!${path.resolve(__dirname, root, 'html-partials/**/*.html')}`
      ]
    }),
    // @ts-ignore
    handlebars({
      partialDirectory: path.resolve(__dirname, './src/html-partials'),
      helpers: {
        // @ts-ignore
        math: helpers.math(),
        // @ts-ignore
        comparison: helpers.comparison()
      },
      context: (pagePath) => {
        return {
          // ページ固有のデータ
          ...GetPageData().find((page) => page.path === pagePath),

          // 共通のデータ
          ...handlebarsContext
        }
      }
    })
  ]
}

if (isProduction) {
  config.esbuild = {
    drop: ['console', 'debugger']
  }
}

export default defineConfig(config)
