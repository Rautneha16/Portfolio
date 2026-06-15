import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Synchronously copy the avatar image from brain directory to images folder
const srcPath = 'C:\\Users\\91996\\.gemini\\antigravity-ide\\brain\\8fc7f5b5-330d-428d-9ba4-05aef35a5e53\\avatar_1781458192754.png'
const destDir = path.resolve('src/components/images')
const destPath = path.join(destDir, 'avatar.png')

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath)
    console.log('Successfully copied avatar image to src/components/images/avatar.png')
  } else {
    console.error('Source avatar image not found at:', srcPath)
  }
} catch (err) {
  console.error('Error copying avatar image:', err)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
