import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import modals from './modals'
import axios from'axios'
import * as filters from './filters'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/v1'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  provide: { modals },
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
