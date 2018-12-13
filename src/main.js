import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'


Vue.config.productionTip = false
Vue.use(infiniteScroll)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
