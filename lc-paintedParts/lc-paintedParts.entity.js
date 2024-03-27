/**
 * @member {string[]} _type 构件类型
 * @member {string[]} _name 构件名称
 * @member {string[]} _specification 规格
 * @member {Map<string, [number, number]>} _parameter 参数
 * @member {string[]} _processList 工序
 * @member {string} _measureUnit 计量单位
 * @member {Map<string, number>} _prices 价格
 */

export class Entity {
    constructor() {
        this._type = [];
        this._name = [];
        this._specification = [];
        this._parameter = new Map();
        this._processList = [];
        this._measureUnit = "";
        this._prices = new Map();
    }

    isArray(value) {
        return value instanceof Array ? true : false;
    }

    isMap(type, value) {
        let result = true;
        if (!value instanceof Map) result = false;
        const _fn = (...args) =>
            args.map(v =>
                v instanceof Object
                    ? v instanceof Array
                        ? "Array"
                        : "Object"
                    : Array.from(typeof v).map((s, i) =>
                              i === 0 ? s.toUpperCase() : s
                          )
                          .reduce((a, b) => a.concat(b))
            );

        value.forEach((v, k) => {
            if (v || (v === 0 && k) || k === 0) {
                _fn(v, k).forEach(t => {
                    if (
                        type[1] !== t[0] ||
                        type[0] !== t[1]
                    )
                        result = false;
                });
            }
        });

        return result;
    }

    get type() {
        return this._type;
    }
    get name() {
        return this._name;
    }
    get specification() {
        return this._specification;
    }
    get parameter() {
        return this._parameter;
    }
    get processList() {
        return this._processList;
    }
    get measureUnit() {
        return this._measureUnit;
    }
    get prices() {
        return this._prices;
    }
    set type(value) {
        if (!this.isArray(value)) throw new TypeError();
        this._type = value;
    }
    set name(value) {
        if (!this.isArray(value)) throw new TypeError();
        this._name = value;
    }
    set specification(value) {
        if (!this.isArray(value)) throw new TypeError();
        this._specification = value;
    }
    set parameter(value) {
        if (!this.isMap(["String", "Array"], value))
            throw new TypeError();

        this._parameter = value;
    }
    set processList(value) {
        if (!this.isArray(value)) throw new TypeError();
        this._processList = value;
    }
    set measureUnit(value) {
        this._measureUnit = value;
    }
    set prices(value) {
        if (!this.isMap(["String", "Number"], value))
            throw new TypeError();

        this._prices = value;
    }

    test() {
        this["name"] = ["", ""];
    }

    format(format, keyList) {
        const _regexp = new RegExp(/\%c/);
        const _replace = (format, value) =>
            format.replace(_regexp, value);
        const _arrHandler = target =>
            target.map(ctx => _replace(format, ctx));
        const _objHandler = target =>
            Object.fromEntries(
                Object.entries(target).map(
                    ctx =>
                        (ctx[1] = _replace(format, ctx[1]))
                )
            );

        keyList.forEach(key => {
            if (this[key] instanceof Array)
                this[key] = _arrHandler(this[key]);
            else if (
                this[key] instanceof Object &&
                !this[key] instanceof Array
            )
                this[key] = _objHandler(this[key]);
            else this[key] = _replace(format, this[key]);
        });
    }

    expand(key) {
        if (!this.isArray(this[key])) throw new TypeError();
        return this[key].join(" ");
    }

    init() {
        this.parameter.set("牛腿数", []);
        this.parameter.set("构件零件比", []);
        this.parameter.set("构件截面", []);
        this.prices.set("编制内价格", 0);
        this.prices.set("编制外价格", 0);

        this.type = ["类型"];
        this.name = ["名称"];
        this.specification = ["规格"];
    }
}
