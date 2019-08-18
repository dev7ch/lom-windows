import Vue from 'vue';
import MyWindow from './components/window/index.vue';
import { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory } from './style';

export { WindowResizeEvent, fixPosition } from './components/window/script';
export { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory };

const LomWindow = {
    install(vue: typeof Vue, options = { prefix: 'lom-window' }) {
        vue.component(`${options.prefix}`, MyWindow);
        vue.component(`${options.prefix}-default`, Default);
        vue.component(`${options.prefix}-black`, StyleBlack);
        vue.component(`${options.prefix}-white`, StyleWhite);
        vue.component(`${options.prefix}-metal`, StyleMetal);;
    },
};

export { windows } from './windows';

export const WindowType = (MyWindow as any) as typeof import('./components/window/script').WindowType;


export default LomWindow;
