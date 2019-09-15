import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { createProvider } from './vue-apollo'
import axios from'axios'
import * as filters from './filters'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000/v1'

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
