import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';
import autoExternal from 'rollup-plugin-auto-external';
import json from '@rollup/plugin-json';

const dist = './lib/';
const name = 'bin';
const production = !process.env.ROLLUP_WATCH;
const sourcemap = !production ? 'inline' : false;
const extensions = ['.ts'];

export default {
  input: './src/bin.ts',
  output: [
    {
      file: `${dist}${name}.js`,
      format: 'cjs',
      sourcemap,
    },
  ],
  plugins: [
    autoExternal(),
    preserveShebangs(),
    nodeResolve({
      extensions,
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions,
      presets: [
        [
          '@babel/preset-env',
          {
            exclude: ['transform-regenerator'],
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        [
          'module-resolver',
          {
            root: '.',
            alias: {
              '@': './src',
            },
          },
        ],
      ],
    }),
    commonjs(),
    json(),
    production && terser({}),
  ],
};
