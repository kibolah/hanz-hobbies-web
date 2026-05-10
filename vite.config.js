import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Ini peta jalan biar Vite mau ngebaca semua folder kita
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        shop: resolve(__dirname, 'customer/shop/index.html'),
        product: resolve(__dirname, 'customer/product/index.html'),
        search: resolve(__dirname, 'customer/search/index.html'),
      }
    }
  }
});