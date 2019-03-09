import resolve from 'rollup-plugin-node-resolve';
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'i18n.js',
  output: {
    file: 'test/build/i18n.bundled-not-usable-as-it-is.js',
    format: 'esm',
  },
  plugins: [
    resolve({
      modulesOnly: true,
    }),
    terser({
      warnings: true,
      mangle: {
        module: false,
      },
    }),
    sizes({
      details: true,
    }),
    filesize({
      showBrotliSize: true,
    }),
  ]
}
