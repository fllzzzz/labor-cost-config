/**
 * 修改场景上下文
 */
export class ModifyContext {
	mode;
	date;
	scope;

	/**
	 * @typedef {Object} Config
	 * @property {(
	 *	| '配置价格修改场景' 
	 *	| '单个价格修改场景' 
	 * )} mode 场景模式
	 * @property {[string, string]} date 修改时间
	 * @property {(
 	 *	| '同步修改前的价格'
 	 *	| '影响修改后的价格'
	 * )} scope 影响范围
	 */

	/**
	 * @param {Config} config 
	 * @property {(
	 *	| '配置价格修改场景' 
	 *	| '单个价格修改场景' 
	 * )} mode 场景模式
	 * @property {[string, string]} date 修改时间
	 * @property {(
 	 *	| '同步修改前的价格'
 	 *	| '影响修改后的价格'
	 * )} scope 影响范围
	 */
	constructor(config) {
		this.mode = config.mode;
        this.date = config.date;
        this.scope = config.scope;
	};
}
