import { Entity } from "./lc-project.entity.js";

export const entityList = [
	new Entity({
		id: '1-1',
		name: "项目1",
		mode: '实时计算模式',
		date: "2020-01-01",
		modifyScenario: [
			{
				mode: "配置价格修改场景",
				date: "2020-01-01",
				scope: "同步修改前的价格",
			},
			{
				mode: "单个价格修改场景",
				date: "2020-01-01",
				scope: "影响修改后的价格",
			},
		],
	}),
	new Entity({
		id: '1-2',
		name: "项目2",
		mode: "实时计算模式",
		date: "2020-01-01",
		modifyScenario: [
			{
				mode: "配置价格修改场景",
				date: "2020-01-01",
				scope: "同步修改前的价格",
			},
			{
				mode: "单个价格修改场景",
				date: "2020-01-01",
				scope: "影响修改后的价格",
			},
		],
	}),
];
