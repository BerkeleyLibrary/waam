import path from 'path';
import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import vitetsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/',
  plugins: [
    {
        name: 'treat-js-files-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/))  return null
  
          // Use the exposed transform from vite, instead of directly
          // transforming with esbuild
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          })
        },
      },
    react(),
    vitetsConfigPaths(),
    commonjs(),
    svgr({
      include: [
        'src/**/*.svg',
      ],
    }),
  ],
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
    proxy: {
        '/api': {
            target: 'http://localhost:3002',
            changeOrigin: true,
            secure: false,
            //rewrite: (path) => path.replace(/^\/api/, ''),
        },
    },
      
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
