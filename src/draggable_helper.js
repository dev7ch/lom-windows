import { SinglePointerEvent } from './SinglePointerEvent';
export class DraggableHelper {
    constructor(handle, container, options = {}) {
        this.handle = handle;
        this.container = container;
        this.options = options;
        this.mousedown = (e) => {
            e.preventDefault();
            const { left, top } = this.handle.getBoundingClientRect();
            this.offsetX = e.clientX - left;
            this.offsetY = e.clientY - top;
            this.options.onMoveStart && this.options.onMoveStart();
            this.unbindMove = SinglePointerEvent.bindMove(document, this.mousemove);
            this.unbindUp = SinglePointerEvent.bindUp(document, this.mouseup);
        };
        this.mousemove = (e) => {
            this.container.style.left = `${e.clientX - this.offsetX}px`;
            this.container.style.top = `${e.clientY - this.offsetY}px`;
            this.options.onMove && this.options.onMove();
        };
        this.mouseup = (e) => {
            this.options.onMoveEnd && this.options.onMoveEnd();
            this.unbindUp();
            this.unbindMove();
            this.unbindUp = this.unbindMove = undefined;
        };
        this.unbindDown = SinglePointerEvent.bindDown(handle, this.mousedown);
        handle.classList.add('draggable-handle');
    }
    teardown() {
        this.handle.classList.remove('draggable-handle');
        this.unbindDown();
        this.unbindUp && this.unbindUp();
        this.unbindMove && this.unbindMove();
    }
}
//# sourceMappingURL=draggable_helper.js.map