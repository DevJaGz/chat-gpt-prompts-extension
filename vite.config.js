import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src', 'popup' , 'index.html'),
      }
    },
  },
})
