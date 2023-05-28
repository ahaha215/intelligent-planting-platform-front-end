import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// 引入Element
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

// // 引入Echarts
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// 引入websocket  
import ws from './util/websocket'
Vue.prototype.$websocket = ws


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
