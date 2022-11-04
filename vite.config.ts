/* eslint-disable @typescript-eslint/ban-ts-comment */
import vitePluginGlobInput from '@macropygia/vite-plugin-glob-input'
import helpers from 'handlebars-helpers'
import path from 'path'
import { defineConfig, Plugin, splitVendorChunkPlugin, UserConfig } from 'vite'
import FullReload from 'vite-plugin-full-reload'
import handlebars from 'vite-plugin-handlebars'

import { GetPageData } from './src/pageData'
import { siteConfig } from './src/siteConfig'

// isProduction
const isProduction = process.env.NODE_ENV === 'production'

// root
const root = './src/'

// publicDir
const publicDir = '../public/'

// handlebarsContext
const handlebarsContext = {
  isProduction: isProduction,
  isDev: !isProduction,
  base: isProduction ? siteConfig.sitePath : '/',
  ...siteConfig
}

// handlebarsOptions
const handlebarsOptions = {
  partialDirectory: path.resolve(__dirname, './src/html-partials'),
  helpers: {
    raw: (options: any) => options.fn(),
    // @ts-ignore
    math: helpers.math(),
    // @ts-ignore
    comparison: helpers.comparison()
  },
  context: (pagePath: string) => {
    return {
      // ページ固有のデータ
      ...GetPageData().find((page) => page.id === pagePath),

      // 共通のデータ
      ...handlebarsContext
    }
  }
}

// vitePluginGlobInputOptions
const vitePluginGlobInputOptions = {
  patterns: [
    root + '**/*.html',
    // src/html-partialsは除く
    `!${root + 'html-partials/**/*.html'}`
  ]
}

// https://vitejs.dev/config/
const config: UserConfig = {
  base: isProduction ? siteConfig.sitePath : '/',
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
      '~/': `${__dirname}/src/`
    }
  },
  plugins: [
    splitVendorChunkPlugin(),
    vitePluginGlobInput(vitePluginGlobInputOptions),
    handlebars(handlebarsOptions) as Plugin,
    FullReload(['public/preview/**/*', 'public/upload/**/*'], { root: __dirname })
  ]
}

if (isProduction) {
  config.esbuild = {
    drop: ['console', 'debugger']
  }
}

export default defineConfig(config)
