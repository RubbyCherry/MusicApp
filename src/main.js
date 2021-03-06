import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@assets/stylus/index.styl'
import "babel-polyfill";
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'

Vue.config.productionTip = false
FastClick.attach(document.body)
Vue.use(VueLazyload,{
  loading: require('@assets/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
