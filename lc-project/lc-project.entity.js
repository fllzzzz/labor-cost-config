import { ModifyContext } from "./lc-project.value.js";

/**
 * @typedef {Object} Config
 * @property {string} id 项目编号
 * @property {string} name 项目名称
 * @property {(
 *	| '实时计算模式'
 * 	| '入库倒推模式'
 * )} mode 项目模式
 * @property {string} date 统计截止时间
 * @property {ModifyContext[]} modifyScenario 修改场景列表
 */

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
	 * @param {Config} config
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
}
