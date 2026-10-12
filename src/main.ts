import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createI18n } from 'vue-i18n'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import App from './App.vue'

// Only the keys SeverityBadge.vue actually reads (t(`severity.${severity}`))
// — this shell has no other i18n-dependent component.
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      severity: { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low', info: 'Info' },
    },
  },
})

createApp(App).use(Quasar).use(i18n).mount('#app')
