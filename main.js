import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import component1 from './components/component1.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('component1',component1) //注册全局组件
  return {
    app
  }
}
// #endif