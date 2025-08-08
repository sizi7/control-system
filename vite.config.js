// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://manager.seersthync.com/mobiCAREConsole', // 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: '/smart-thync-tank/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['xlsx-style'], // ✅ 여기에 추가
  },
});
