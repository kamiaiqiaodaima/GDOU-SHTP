import Vue from 'vue'
import App from './App.vue'
import './element';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
import router from './routers';
import store from './store';
import axios from 'axios';
const instance = axios.create({
  baseURL:""
})
Vue.prototype.$instance = instance;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
