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
	 * @param {string[]} key 操作的对象名字
	 * @param 
	 */
	split() {};
	union() {};
};