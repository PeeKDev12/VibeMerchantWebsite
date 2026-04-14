import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this line! Replace 'spa-website' with your EXACT GitHub repository name
  base: '/VibeMerchantWebsite/', 
})