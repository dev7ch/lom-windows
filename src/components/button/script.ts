import { WindowStyle, WINDOW_STYLE_KEY } from '@/style';
import { Component, Vue, Prop, Inject } from 'vue-property-decorator';
import { SinglePointerEvent } from '@/SinglePointerEvent';

@Component
export class Button extends Vue {
  @Inject(WINDOW_STYLE_KEY)
  public windowStyle!: WindowStyle;

  @Prop({ type: Boolean, default: false })
  public disabled!: boolean;

  public hover = false;
  public active = false;

  get style() {
    let s = this.windowStyle.button;
    this.hover && (s = { ...s, ...this.windowStyle.buttonHover });
    this.active && (s = { ...s, ...this.windowStyle.buttonActive });
    return s;
  }

  public mousedown(e: MouseEvent & TouchEvent) {
    e.preventDefault();
    this.active = true;
    const unbindUp = SinglePointerEvent.bindUp(document, () => {
      this.active = false;
      unbindUp();
    });
  }

  public mouseup(e: MouseEvent & TouchEvent) {
    if (this.active) {
      this.$emit('click');
    }
  }
}
