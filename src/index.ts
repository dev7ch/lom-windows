import Vue from 'vue';
import MyWindow from './components/window/index.vue';
import { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory } from './style';

export { WindowResizeEvent, fixPosition } from './components/window/script';
export { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory };

const options = { prefix: 'lom-window' };
const LomWindow = () => {
    Vue.component(`${options.prefix}`, MyWindow);
    Vue.component(`${options.prefix}-default`, Default);
    Vue.component(`${options.prefix}-black`, StyleBlack);
    Vue.component(`${options.prefix}-white`, StyleWhite);
    Vue.component(`${options.prefix}-metal`, StyleMetal);
};

export { windows } from './windows';

export const WindowType = (MyWindow as any) as typeof import('./components/window/script').WindowType;

export default LomWindow;
