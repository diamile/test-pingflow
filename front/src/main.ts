import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md2 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    blueprint: md2,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
  })

app.use(createPinia())
app.use(router)

app.mount('#app')
