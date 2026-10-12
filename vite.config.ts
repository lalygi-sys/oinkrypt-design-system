import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// Minimal standalone shell — just enough Quasar to run the design-system
// preview's real components (AppButton/AppInput/AppSelect/FilterChip/
// SeverityBadge all wrap QBtn/QInput/QSelect/QChip/QBadge). No router, no
// app CLI, no product code copied in — those don't exist here on purpose.
export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ sassVariables: false }),
  ],
  server: {
    port: 5183,
  },
})
