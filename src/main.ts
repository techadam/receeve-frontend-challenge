import Vue from 'vue'
import App from  '@/App.vue'
import '@/assets/scss/main.scss'
import router from './router'

//Toastify integration
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
Vue.use(VueToast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
