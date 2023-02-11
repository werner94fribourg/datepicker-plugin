import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { readFile } from 'fs/promises';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

const packageJson = JSON.parse(
  await readFile(new URL('./package.json', import.meta.url))
);
//import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // This prevents needing an additional `external` prop in this config file by automaticall excluding peer dependencies
      peerDepsExternal(),
      postcss({
        extract: false,
        modules: true,
        use: ['sass'],
      }),
      // Do Babel transpilation
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: [['@babel/preset-react', { runtime: 'automatic' }]],
      }),
      // Convert CommonJS modules to ES6
      commonjs({
        include: 'node_modules/**',
        // This was required to fix some random errors while building
        namedExports: {
          'react-is': ['isForwardRef', 'isValidElementType'],
        },
      }),
      // "...locates modules using the Node resolution algorithm"
      resolve(),
      // Does a number of things; Compiles sass, run autoprefixer, creates a sourcemap, and saves a .css file
    ],
  },
];
