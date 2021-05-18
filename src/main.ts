import Vue from 'vue'
import App from  '@/App.vue'
import '@/assets/scss/main.scss'
import router from './router'

//Toastify integration
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
Vue.use(VueToast)

//Axios integration
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = `http://localhost:9001/`

//Chartist integration
Vue.use(require('vue-chartist'))


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
