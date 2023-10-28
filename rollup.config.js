import { resolve } from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, 'dist');

const rollupConfig = [
  {
    input: resolve(__dirname, 'src', 'content-script.js'),
    output: {
      name: 'content-script.js',
      format: 'iife',
      dir: outDir,
    }
  },
  {
    input: resolve(__dirname, 'src', 'service-worker.js'),
    output: {
      name: 'service-worker.js',
      format: 'iife',
      dir: outDir,
    }
  },
]

export default rollupConfig;
