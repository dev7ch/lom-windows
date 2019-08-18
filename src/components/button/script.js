import * as tslib_1 from "tslib";
import { WINDOW_STYLE_KEY } from './../../style';
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import { SinglePointerEvent } from './../../SinglePointerEvent';
let Button = class Button extends Vue {
    constructor() {
        super(...arguments);
        this.hover = false;
        this.active = false;
    }
    get style() {
        let s = this.windowStyle.button;
        this.hover && (s = { ...s, ...this.windowStyle.buttonHover });
        this.active && (s = { ...s, ...this.windowStyle.buttonActive });
        return s;
    }
    mousedown(e) {
        e.preventDefault();
        this.active = true;
        const unbindUp = SinglePointerEvent.bindUp(document, () => {
            this.active = false;
            unbindUp();
        });
    }
    mouseup(e) {
        if (this.active) {
            this.$emit('click');
        }
    }
};
tslib_1.__decorate([
    Inject(WINDOW_STYLE_KEY)
], Button.prototype, "windowStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Button.prototype, "disabled", void 0);
Button = tslib_1.__decorate([
    Component
], Button);
export { Button };
//# sourceMappingURL=script.js.map