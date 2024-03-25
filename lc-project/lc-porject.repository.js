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

	async load(mode) {
		return await fetch(
			`
			${baseURL}
			/api/system/contract-project-statistics-config-link/list
			?statisticsMode=${modeMap.get(mode)}
		`,
			{
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "x-www-form-urlencoded",
				},
			}
		)
			.then(res => res.json())
			.then(result => result.data)
			.then(list =>
				list.map(data => ({
					id: data.id,
					name: data.projectName,
					mode: data.statisticsModeName,
					date: data.statisticsDeadline,
					modifyScenario: [
						{
							date: [
								data.configPriceSyncStartDate,
								data.configPriceSyncEndDate,
							],
							scope: data.configPriceName,
							mode: "配置价格修改场景",
						},
						{
							date: [
								data.individualPriceSyncStartDate,
								data.individualPriceSyncEndDate,
							],
							scope: data.individualPriceName,
							mode: "单个价格修改场景",
						},
					],
					context: {
						projectId: data.contractProjectId,
					},
				}))
			)
			.then(list => (this.entityList.value = list));
	}

	async save(index) {
		const entity = this.entityList.value[index];
		const modify = entity.modifyScenario
			.map(item => {
				console.log(item.data);
				if (item.mode === "配置价格修改场景")
					return {
						configPrice: scopeMap.get(item.scope),
						configPriceSyncStartDate: item.date[0],
						configPriceSyncEndDate: item.date[1]
					};
				if (item.mode === "单个价格修改场景")
					return {
						individualPrice: scopeMap.get(item.scope),
						individualPriceSyncStartDate: item.date[0],	
						individualPriceSyncEndDate: item.date[1]
					};
			})
			.filter(item => item)
			.reduce((a, b) => Object.assign(a, b));
		const data = {
			id: entity.id,
			contractProjectId: entity.context.projectId,
			statisticsMode: modeMap.get(entity.mode),
			statisticsDeadline: entity.date,
			...modify,
		};

		return await fetch(
			`${baseURL}/api/system/contract-project-statistics-config-link`,
			{
				method: "PUT",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		)
			.then(res => res.json())
			.then(result => {
				console.log(result);
			});
	}

	formatDate() {
		this.entityList.value.forEach(entity => {
			entity.data = new Date(entity.data).toLocaleDateString();

			entity.modifyScenario.forEach(
				item =>
					(item.date = new Date(item.date).toLocaleDateString())
			);
		});
	}
}
