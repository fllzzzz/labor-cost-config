import { Entity } from "./lc-project.entity.js";
import { shallowRef } from "vue";

const baseURL = "http://192.168.110.120:8088";
const modeMap = new Map([
	["实时计算模式", 1],
	["入库倒推模式", 2],
]);
const scopeMap = new Map([
	["同步修改前的价格", 1],
	["影响修改后的价格", 2],
]);
const propertyNameMap = new Map([]);

export class Repository {
	/**
	 * @type {Entity[]}
	 */
	entityList = shallowRef([]);
	modeList = ["实时计算模式", "入库倒推模式"];
	modifyScreenList = [
		"配置价格修改场景",
		"单个价格修改场景",
	];
	scopeList = ["同步修改前的价格", "影响修改后的价格"];
	dateFormat = "YYYY/M/D";

}
