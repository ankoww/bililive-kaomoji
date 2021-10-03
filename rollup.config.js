// Copyright (c) 2021 Anko Lin
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'
import importCSS from 'rollup-plugin-import-css'
import includePaths from 'rollup-plugin-includepaths'

const config = {
  input: ['src/injector.jsx'],
  output: {
    file: 'build/injector.js',
    format: 'iife',
  },
  plugins: [
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
      ],
    }),
    includePaths({
      paths: ['src'],
      extensions: ['.js', '.jsx'],
    }),
    nodeResolve(),
    importCSS({
      output: 'bundle.css',
      minify: true,
    }),
    babel({ babelHelpers: 'bundled', extensions: ['.js', '.jsx'] }),
    copy({
      targets: [{ src: 'src/manifest.json', dest: 'build' }],
    }),
  ],
}

export default config
