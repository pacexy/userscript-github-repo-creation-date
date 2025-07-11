import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'GitHub Repo Creation Date',
        description: 'Display creation date of repositories on GitHub',
        icon: 'https://github.com/favicon.ico',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://github.com/*/*'],
      },
      server: {
        open: false,
      },
    }),
  ],
})
