import { naturalSize, getRect } from './dom';
import { SinglePointerEvent } from './SinglePointerEvent';
export class ResizableHelper {
    constructor(container, options) {
        this.container = container;
        this.options = options;
        this.handles = HandleClasses.map((H) => new H(container, this));
        const { width, height } = naturalSize(container);
        const maxWidth = options.maxWidth || window.innerWidth;
        const maxHeight = options.maxHeight || window.innerHeight;
        let resize = false;
        if (width < options.minWidth || width > maxWidth) {
            container.style.width = `${clamp(width, options.minWidth, maxWidth)}px`;
            resize = true;
        }
        if (height < options.minHeight || height > maxHeight) {
            container.style.height = `${clamp(height, options.minHeight, maxHeight)}px`;
            resize = true;
        }
        resize && options.onResize && options.onResize();
    }
    teardown() {
        this.handles.forEach((h) => h.teardown());
    }
}
const HandleClasses = [];
class HandleBase {
    constructor(container, helper) {
        this.container = container;
        this.helper = helper;
        this.handleSize = 8;
        this.mousedown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const { left, top, width, height } = getRect(this.container);
            this.x0 = e.clientX;
            this.y0 = e.clientY;
            this.left0 = left;
            this.top0 = top;
            this.width0 = width;
            this.height0 = height;
            this.calcSafeBoundaries();
            this.helper.options.onResizeStart && this.helper.options.onResizeStart();
            this.unbindMove = SinglePointerEvent.bindMove(document, this.mousemove);
            this.unbindUp = SinglePointerEvent.bindUp(document, this.mouseup);
        };
        this.mousemove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setPosition(e);
            this.fixPosition();
            this.helper.options.onResize && this.helper.options.onResize();
        };
        this.mouseup = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.helper.options.onResizeEnd && this.helper.options.onResizeEnd();
            this.unbindUp();
            this.unbindMove();
            this.unbindUp = this.unbindMove = undefined;
        };
        this.handle = this.createHandleElement();
        this.unbindDown = SinglePointerEvent.bindDown(this.handle, this.mousedown);
        // this.handle.style.border = 'solid 1px black'
    }
    teardown() {
        this.unbindDown();
        this.unbindUp && this.unbindUp();
        this.unbindMove && this.unbindMove();
        this.handle.parentElement.removeChild(this.handle);
    }
    calcSafeBoundaries() {
        const { left, top, right, bottom } = getRect(this.container);
        const options = this.helper.options;
        const maxWidth = options.maxWidth || window.innerWidth;
        const maxHeight = options.maxHeight || window.innerHeight;
        this.minLeft = Math.max(right - maxWidth, 0);
        this.maxLeft = right - options.minWidth;
        this.minRight = left + options.minWidth;
        this.maxRight = Math.min(left + maxWidth, window.innerWidth);
        this.minTop = Math.max(bottom - maxHeight, 0);
        this.maxTop = bottom - options.minHeight;
        this.minBottom = top + options.minHeight;
        this.maxBottom = Math.min(top + maxHeight, window.innerHeight);
    }
    fixPosition() {
        const { width, height, left, top, right, bottom } = getRect(this.container);
        const options = this.helper.options;
        if (left < this.minLeft) {
            this.container.style.width = `${width + left - this.minLeft}px`;
            this.container.style.left = `${this.minLeft}px`;
        }
        else if (left > this.maxLeft) {
            this.container.style.width = `${options.minWidth}px`;
            this.container.style.left = `${this.maxLeft}px`;
        }
        else if (right < this.minRight) {
            this.container.style.width = `${options.minWidth}px`;
        }
        else if (right > this.maxRight) {
            this.container.style.width = `${this.maxRight - left}px`;
        }
        if (top < this.minTop) {
            this.container.style.height = `${height + top - this.minTop}px`;
            this.container.style.top = `${this.minTop}px`;
        }
        else if (top > this.maxTop) {
            this.container.style.height = `${options.minHeight}px`;
            this.container.style.top = `${this.maxTop}px`;
        }
        else if (bottom < this.minBottom) {
            this.container.style.height = `${options.minHeight}px`;
        }
        else if (bottom > this.maxBottom) {
            this.container.style.height = `${this.maxBottom - top}px`;
        }
    }
    createHandleElement() {
        const div = document.createElement('div');
        const style = div.style;
        // style.border = 'solid 1px red'
        // style.backgroundColor = 'rgba(0,0,0,0.25)'
        style.position = 'absolute';
        this.applyStyle(style);
        this.container.appendChild(div);
        return div;
    }
}
HandleClasses.push(class BottomRight extends HandleBase {
    setPosition(e) {
        this.container.style.width = `${this.width0 + e.clientX - this.x0}px`;
        this.container.style.height = `${this.height0 + e.clientY - this.y0}px`;
    }
    applyStyle(style) {
        style.width = `${2 * this.handleSize}px`;
        style.height = `${2 * this.handleSize}px`;
        style.right = `${-this.handleSize}px`;
        style.bottom = `${-this.handleSize}px`;
        style.cursor = 'nwse-resize';
    }
}, class Bottom extends HandleBase {
    setPosition(e) {
        this.container.style.height = `${this.height0 + e.clientY - this.y0}px`;
    }
    applyStyle(style) {
        style.right = `${this.handleSize}px`;
        style.left = `${this.handleSize}px`;
        style.height = `${2 * this.handleSize}px`;
        style.bottom = `${-this.handleSize}px`;
        style.cursor = 'ns-resize';
    }
}, class BottomLeft extends HandleBase {
    setPosition(e) {
        this.container.style.left = `${this.left0 + e.clientX - this.x0}px`;
        this.container.style.width = `${this.width0 - (e.clientX - this.x0)}px`;
        this.container.style.height = `${this.height0 + e.clientY - this.y0}px`;
    }
    applyStyle(style) {
        style.left = `${-this.handleSize}px`;
        style.bottom = `${-this.handleSize}px`;
        style.width = `${2 * this.handleSize}px`;
        style.height = `${2 * this.handleSize}px`;
        style.cursor = 'nesw-resize';
    }
}, class Left extends HandleBase {
    setPosition(e) {
        this.container.style.left = `${this.left0 + e.clientX - this.x0}px`;
        this.container.style.width = `${this.width0 - (e.clientX - this.x0)}px`;
    }
    applyStyle(style) {
        style.left = `${-this.handleSize}px`;
        style.bottom = `${this.handleSize}px`;
        style.width = `${2 * this.handleSize}px`;
        style.top = `${this.handleSize}px`;
        style.cursor = 'ew-resize';
    }
}, class TopLeft extends HandleBase {
    setPosition(e) {
        this.container.style.left = `${this.left0 + e.clientX - this.x0}px`;
        this.container.style.width = `${this.width0 - (e.clientX - this.x0)}px`;
        this.container.style.top = `${this.top0 + e.clientY - this.y0}px`;
        this.container.style.height = `${this.height0 - (e.clientY - this.y0)}px`;
    }
    applyStyle(style) {
        style.left = `${-this.handleSize}px`;
        style.top = `${-this.handleSize}px`;
        style.width = `${2 * this.handleSize}px`;
        style.height = `${2 * this.handleSize}px`;
        style.cursor = 'nwse-resize';
    }
}, class Top extends HandleBase {
    setPosition(e) {
        this.container.style.top = `${this.top0 + e.clientY - this.y0}px`;
        this.container.style.height = `${this.height0 - (e.clientY - this.y0)}px`;
    }
    applyStyle(style) {
        style.left = `${this.handleSize}px`;
        style.right = `${this.handleSize}px`;
        style.height = `${2 * this.handleSize}px`;
        style.top = `${-this.handleSize}px`;
        style.cursor = 'ns-resize';
    }
}, class TopRight extends HandleBase {
    setPosition(e) {
        this.container.style.top = `${this.top0 + e.clientY - this.y0}px`;
        this.container.style.height = `${this.height0 - (e.clientY - this.y0)}px`;
        this.container.style.width = `${this.width0 + e.clientX - this.x0}px`;
    }
    applyStyle(style) {
        style.right = `${-this.handleSize}px`;
        style.top = `${-this.handleSize}px`;
        style.height = `${2 * this.handleSize}px`;
        style.width = `${2 * this.handleSize}px`;
        style.cursor = 'nesw-resize';
    }
}, class Right extends HandleBase {
    setPosition(e) {
        this.container.style.width = `${this.width0 + e.clientX - this.x0}px`;
    }
    applyStyle(style) {
        style.right = `${-this.handleSize}px`;
        style.top = `${this.handleSize}px`;
        style.bottom = `${this.handleSize}px`;
        style.width = `${2 * this.handleSize}px`;
        style.cursor = 'ew-resize';
    }
});
function clamp(x, min, max) {
    return x < min ? min : (x > max ? max : x);
}
//# sourceMappingURL=resizable_helper.js.map