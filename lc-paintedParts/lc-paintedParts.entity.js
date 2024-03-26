/**
 * @member {string[]} _type 构件类型
 * @member {string[]} _name 构件名称
 * @member {string[]} _specification 规格
 * @member {Map<string, string[]>} _parameter 参数
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

    isMapItem(type, value) {
        if (!isArray(value)) return false;
        if (typeof value[0] !== type || !value[1])
            return false;
        return true;
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
        if (!this.isMapItem("string", value))
            throw new TypeError();

        this._parameter.set(value[0], value[1]);
    }
    set processList(value) {
        if (!this.isArray(value)) throw new TypeError();
        this._processList = value;
    }
    set measureUnit(value) {
        this._measureUnit = value;
    }
    set prices(value) {
        if (!this.isMapItem("string", value))
            throw new TypeError();

        this._prices.set(value[0], value[1]);
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
        if(! this.isArray(this[key])) throw new TypeError();
        return this[key].join(' ');
    };
}
