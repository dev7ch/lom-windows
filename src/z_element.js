export class ZElement {
    constructor(_group, onChange) {
        this._group = _group;
        this.onChange = onChange;
        this.a((a) => a.push(this));
    }
    set group(_group) {
        this._group = _group;
        const a1 = a(this._group);
        const a2 = a(_group);
        a1.splice(a1.indexOf(this), 1);
        a2.push(this);
        refresh();
    }
    get group() {
        return this._group;
    }
    unregister() {
        this.a((a) => a.splice(a.indexOf(this), 1));
    }
    raise() {
        this.a((a) => {
            a.splice(a.indexOf(this), 1);
            a.push(this);
        });
    }
    a(cb) {
        cb(a(this._group));
        refresh();
    }
}
const registry = new Map();
const BASE = 0;
function a(group) {
    if (!registry.has(group)) {
        registry.set(group, []);
    }
    return registry.get(group);
}
function compare(a, b) {
    if (a > b) {
        return -compare(b, a);
    }
    // always a <= b
    if (a < 0) {
        if (b >= 0) {
            return 1;
        }
        return a - b;
    }
    return a - b;
}
// const arr = [ 4, 8, 6, -6, 3, -10, 6, 2, 6, 3, -7, -6, 9, 8, 3, -2, -3, -6, 8, -8 ]
// arr.sort(compare)
// arr => [ 2, 3, 3, 3, 4, 6, 6, 6, 8, 8, 8, 9, -10, -8, -7, -6, -6, -6, -3, -2 ]
function refresh() {
    let zIndex = BASE;
    for (const g of keys(registry).sort(compare)) {
        for (const z of a(g)) {
            if (zIndex != z.zIndex) {
                z.zIndex = zIndex;
                z.onChange(zIndex);
            }
            zIndex++;
        }
    }
}
function keys(map) {
    const keys = [];
    map.forEach((v, k) => keys.push(k));
    return keys;
}
//# sourceMappingURL=z_element.js.map