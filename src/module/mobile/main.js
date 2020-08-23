import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
// import 'element-ui/lib/theme-chalk/index.css';

//css
import '@/assets/less/index.less';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
