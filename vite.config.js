import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({

  plugins: [
    tailwindcss(),
    react()],
    server:{
      proxy:{
        '/api':{
          target:'https://api.themoviedb.org/3',
          changeOrigin:true,
          rewrite:path=>path.replace(/^\/api/,'')
        }
      },
      port: 3000,
    },
})
