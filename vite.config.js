import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
 base: '/Todo-list-page/',
 server: {  
  port: 3000, // Change the dev server port if needed
},
 build: {
  rollupOptions: {
    external: ['react/jsx-runtime']
  }
}
})
