import Vue from 'vue';
import App from './App.vue';
import LomWindow from '@/index';
Vue.config.productionTip = false;

Vue.use(LomWindow);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
