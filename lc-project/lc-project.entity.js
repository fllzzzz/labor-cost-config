import { ModifyContext } from "./lc-project.value.js";

/**
 * 项目工价 -> 实体模型
 */
export class Entity {
	id;
	name;
	mode;
	date;
	modifyScenario;
	context;

	/**
	 * @typedef {Object} Config
	 * @property {number} id 项目编号
	 * @property {string} name 项目名称
	 * @property {(
	 *	| '实时计算模式'
	 * 	| '入库倒推模式'
	 * )} mode 项目模式
	 * @property {string} date 统计截止时间
	 * @property {ModifyContext[]} modifyScenario 修改场景列表
	 */

	/**
	 * @param {Config} config
	 * @property {number} id 项目编号
	 * @property {string} name 项目名称
	 * @property {(
	 *	| '实时计算模式'
	 * 	| '入库倒推模式'
	 * )} mode 项目模式
	 * @property {string} date 统计截止时间
	 * @property {ModifyContext[]} modifyScenario 修改场景列表
	 */
	constructor(config) {
		this.id = config.id;
		this.name = config.name;
		this.mode = config.mode;
		this.date = config.date;
		this.modifyScenario = config.modifyScenario.map(
			ctx => new ModifyContext(ctx)
		);
	}

	/**
	 * @param {string} key 属性名
	 * @param {(context) => Map<string, any>} fn callback
	 * @returns {void}
	 */
	separate(key, fn) {
		const fnResultList = [];

		this[key] instanceof Array
			? this[key].forEach(item => {
					fnResultList.push(fn(item));
			  })
			: fnResultList.push(fn(this[key]));

		fnResultList.forEach(map => {
			Array.from(map.entries()).forEach(
				ctx => (this[ctx[0]] = ctx[1])
			);
		});
	}

	/**
	 * 
	 */
	aggregation() {}
}
