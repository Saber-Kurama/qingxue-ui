const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const createDemoPlugin = require('./build/vite-plugin-demo')

/**
 * @type {import('vite').UserConfig} 
 */
module.exports = {
  root: __dirname,
  plugins: createDemoPlugin(),
  resolve: {
    alias: process.env.NODE_ENV !== 'production' ? 
      [
        {
          find: 'native-ui',
          replacement: path.resolve(__dirname, './src')
        }
      ] : null
  },
  build: {
    outDir: 'site',
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
