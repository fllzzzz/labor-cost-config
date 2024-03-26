import { Repository } from "./lc-porject.repository.js";
import { ref, watch, watchEffect } from "vue";

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
                        id: `${item.id}-${item.contractProjectId}`,
                        name: item.projectName ?? "",
                        mode: item.statisticsModeName ?? "",
                        date: item.statisticsDeadline
                            ? typeof item.statisticsDeadline ===
                              "string"
                                ? item.statisticsDeadline
                                : new Date(
                                      item.statisticsDeadline
                                  ).toLocaleDateString()
                            : "",
                        modifyScenario: [
                            {
                                date: [
                                    item.configPriceSyncStartDate
                                        ? typeof item.configPriceSyncStartDate ===
                                          "string"
                                            ? item.configPriceSyncStartDate
                                            : new Date(
                                                  item.configPriceSyncStartDate
                                              ).toLocaleDateString()
                                        : "",
                                    item.configPriceSyncEndDate
                                        ? typeof item.configPriceSyncEndDate ===
                                          "string"
                                            ? item.configPriceSyncEndDate
                                            : new Date(
                                                  item.configPriceSyncEndDate
                                              ).toLocaleDateString()
                                        : "",
                                ],
                                scope:
                                    item.configPriceName ??
                                    "",
                                mode: "配置价格修改场景",
                            },
                            {
                                date: [
                                    item.configPriceSyncStartDate
                                        ? typeof item.configPriceSyncStartDate ===
                                          "string"
                                            ? item.configPriceSyncStartDate
                                            : new Date(
                                                  item.configPriceSyncStartDate
                                              ).toLocaleDateString()
                                        : "",
                                    item.configPriceSyncEndDate
                                        ? typeof item.configPriceSyncEndDate ===
                                          "string"
                                            ? item.configPriceSyncEndDate
                                            : new Date(
                                                  item.configPriceSyncEndDate
                                              ).toLocaleDateString()
                                        : "",
                                ],
                                scope:
                                    item.individualPriceName ??
                                    "",
                                mode: "单个价格修改场景",
                            },
                        ],
                    };
                })
            );

        watchEffect(() => mode.value && _fn(mode.value));
    }

    save(index) {
        this.repo.save(
            this.repo.find(index),
            ({ entity, modeEumnMap, scopeEumnMap }) => {
                const _id = entity.id.split("-");
                return {
                    id: _id[0] ? parseInt(_id[0]) : -1,
                    contractProjectId: _id[1]
                        ? parseInt(_id[1])
                        : -1,
                    statisticsMode:
                        modeEumnMap.get(entity.mode) ?? -1,
                    statisticsDeadline:
                        entity.date && entity.date !== ""
                            ? new Date(
                                  entity.date
                              ).valueOf()
                            : "",
                    ...entity.modifyScenario
                        .map(item => {
                            if (
                                item.mode ===
                                "配置价格修改场景"
                            )
                                return {
                                    configPrice:
                                        scopeEumnMap.get(
                                            item.scope
                                        ) ?? -1,
                                    configPriceSyncStartDate:
                                        item.date[0]
                                            ? new Date(
                                                  item.date[0]
                                              ).valueOf()
                                            : "",
                                    configPriceSyncEndDate:
                                        item.date[1]
                                            ? new Date(
                                                  item.date[1]
                                              ).valueOf()
                                            : "",
                                };
                            if (
                                item.mode ===
                                "单个价格修改场景"
                            )
                                return {
                                    individualPrice:
                                        scopeEumnMap.get(
                                            item.scope
                                        ) ?? -1,
                                    individualPriceSyncStartDate:
                                        item.date[0]
                                            ? new Date(
                                                  item.date[0]
                                              ).valueOf()
                                            : "",
                                    individualPriceSyncEndDate:
                                        item.date[1]
                                            ? new Date(
                                                  item.date[1]
                                              ).valueOf()
                                            : "",
                                };
                        })
                        .reduce((a, b) =>
                            Object.assign(a, b)
                        ),
                };
            }
        );
    }

    modify(index, key, value) {
        watchEffect(
            () =>
                value.value &&
                this.repo.find(index)[key] === value.value
        );
    }

    watchDate(index) {
        const date = ref(this.repo.find(index).date);

        watch(date, v => (this.repo.find(index).date = v));

        return date;
    }

    getEntityByScreenMode(index, mode) {
        return this.repo
            .find(index)
            .modifyScenario.find(ctx => ctx.mode === mode);
    }

    changeModifyScreenScope(index, mode, value) {
        watch(value, v => {
            this.repo.entityList.value[
                index
            ].modifyScenario.find(
                ctx => ctx.mode === mode
            ).scope = v ? v : "";
            console.log(this.repo.entityList.value[index]);
        });
    }

    changeModifyScreenDate(index, mode, value) {
        watch(value, v => {
            this.repo.entityList.value[
                index
            ].modifyScenario.find(
                ctx => ctx.mode === mode
            ).date = v
                ? v.map(date => date.toLocaleDateString())
                : ["", ""];

            console.log(this.repo.entityList.value[index]);
        });
    }
}
