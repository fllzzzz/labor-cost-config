import { Repository } from "./lc-porject.repository.js";
import { watchEffect } from "vue";

export class Aggregate {
    repo;

    /**
     * @param {Repository} Repository
     */
    constructor() {
        this.repo = new Repository();
    }

    /**
     * @param {string} mode
     * @param {Ref<[]>} result
     */
    load(mode) {
        const _fn = mode =>
            this.repo.load(mode, data =>
                data.map(item => {
                    return {
                        id: `${item.id}-${item.projectId}`,
                        name: item.projectName ?? "",
                        mode: statisticsModeName ?? "",
                        date: statisticsDeadline ?? "",
                        modifyScenario: [
                            {
                                date: [
                                    data.configPriceSyncStartDate ??
                                        "",
                                    data.configPriceSyncEndDate ??
                                        "",
                                ],
                                scope:
                                    data.configPriceName ??
                                    "",
                                mode: "配置价格修改场景",
                            },
                            {
                                date: [
                                    data.individualPriceSyncStartDate ??
                                        "",
                                    data.individualPriceSyncEndDate ??
                                        "",
                                ],
                                scope:
                                    data.individualPriceName ??
                                    "",
                                mode: "单个价格修改场景",
                            },
                        ],
                    };
                })
            );

        watchEffect(() => mode && _fn(mode));
    }

    save(index) {
        this.repo.save(
            this.repo.find(index),
            ({ entity, modeEumnMap, scopeEumnMap }) => {
                const _id = entity.id.split("-");
                return {
                    id: _id[0] ?? -1,
                    contractProjectId: _id[1] ?? -1,
                    statisticsMode:
                        modeEumnMap.get(entity.mode) ?? -1,
                    statisticsDeadline: entity.date ?? "",
                    ...map(item => {
                        if (
                            item.mode === "配置价格修改场景"
                        )
                            return {
                                configPrice:
                                    scopeEumnMap.get(
                                        item.scope
                                    ) ?? -1,
                                configPriceSyncStartDate:
                                    item.date[0] ?? "",
                                configPriceSyncEndDate:
                                    item.date[1] ?? "",
                            };
                        if (
                            item.mode === "单个价格修改场景"
                        )
                            return {
                                individualPrice:
                                    scopeEumnMap.get(
                                        item.scope
                                    ) ?? -1,
                                individualPriceSyncStartDate:
                                    item.date[0] ?? "",
                                individualPriceSyncEndDate:
                                    item.date[1] ?? "",
                            };
                    }).reduce((a, b) =>
                        Object.assign(a, b)
                    ),
                };
            }
        );
    }

	modify(index, key, value) {
		watchEffect(() => value && this.repo.find(index)[key] === value);
	};
}
