import Vue from 'vue';
import App from './App.vue';
import MyWindow from './window/index.vue';
import { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory } from './style';
export { WindowResizeEvent, fixPosition } from './window/script';
export { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory };
const options = { prefix: 'lom-window' };
Vue.component(`${options.prefix}`, MyWindow);
Vue.component(`${options.prefix}-default`, Default);
Vue.component(`${options.prefix}-style-black`, StyleBlack);
Vue.component(`${options.prefix}-style-white`, StyleWhite);
Vue.component(`${options.prefix}-style-metal`, StyleMetal);
export { windows } from './windows';
//export WindowType = (MyWindow as any) as typeof import('./window/script').WindowType;
Vue.config.productionTip = false;
new Vue({
    render: (h) => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map