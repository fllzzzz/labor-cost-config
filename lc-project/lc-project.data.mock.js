import { Entity } from "./lc-project.entity.js";
import { ModifyContext } from "./lc-project.value.js";

export const entityList = [
	new Entity({
		id: 1,
		name: "项目1",
		mode: '实时计算模式',
		date: "2020-01-01",
		modifyScenario: [
			new ModifyContext({
				mode: "配置价格修改场景",
				date: "2020-01-01",
				scope: "同步修改前的价格",
			}),
			new ModifyContext({
				mode: "单个价格修改场景",
				date: "2020-01-01",
				scope: "影响修改后的价格",
			}),
		],
	}),
	new Entity({
		id: 2,
		name: "项目2",
		mode: "实时计算模式",
		date: "2020-01-01",
		modifyScenario: [
			new ModifyContext({
				mode: "配置价格修改场景",
				date: "2020-01-01",
				scope: "同步修改前的价格",
			}),
			new ModifyContext({
				mode: "单个价格修改场景",
				date: "2020-01-01",
				scope: "影响修改后的价格",
			}),
		],
	}),
];
