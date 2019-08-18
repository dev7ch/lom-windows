import Vue from 'vue';
import MyWindow from '@/window/index.vue';
import { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory } from './style';

export { WindowResizeEvent, fixPosition } from '@/window/script';
export { StyleBlack, StyleWhite, StyleMetal, Default, StyleFactory };

export { windows } from './windows';

// export const WindowType = (MyWindow as any) as typeof import('./window/script').WindowType;


const options = { prefix: 'lom-window' }

const LomWindow = () => {

    Vue.component(`${options.prefix}`, MyWindow);
    Vue.component(`${options.prefix}-default`, Default);
    Vue.component(`${options.prefix}-black`, StyleBlack);
    Vue.component(`${options.prefix}-white`, StyleWhite);
    Vue.component(`${options.prefix}-metal`, StyleMetal);
    /*install(vue: typeof Vue, options = { prefix: 'lom-window' }) {

        vue.component(`${options.prefix}`, MyWindow);
        vue.component(`${options.prefix}-default`, Default);
        vue.component(`${options.prefix}-black`, StyleBlack);
        vue.component(`${options.prefix}-white`, StyleWhite);
        vue.component(`${options.prefix}-metal`, StyleMetal);
        // We call Vue.mixin() here to inject functionality into all components.
        vue.mixin({
            // Anything added to a mixin will be injected into all components.
            // In this case, the mounted() method runs when the component is added to the DOM.
            mounted() {
                console.log(this, 'Mounted!');
            },
        });
    },*/
};

export default LomWindow;
