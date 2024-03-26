import { shallowRef } from "vue";
import { entityList } from "./lc-project.data.mock.js";

/**
 * @typedef {Object} Context
 * @property {string} baseURL
 * @property {string} dateformat
 * @property {string[]} modeList
 * @property {string[]} scopeList
 * @property {string[]} modifyScreenList
 * @property {Map<string, string>} apiMap
 * @property {Map<string, number>} modeEumnMap
 * @property {Map<string, number>} scopeEumnMap
 */

export class Repository {
    entityList;
    context;

    constructor() {
        this.entityList = shallowRef([]);
        this.context = {
            baseURL: "http://192.168.110.120:8088",
            dateformat: "YYYY-MM-DD",
            modeList: ["实时计算模式", "入库倒推模式"],
            scopeList: [
                "同步修改前的价格",
                "影响修改后的价格",
            ],
            modifyScreenList: [
                "配置价格修改场景",
                "单个价格修改场景",
            ],
            apiMap: new Map([
                [
                    "load",
                    "/api/system/contract-project-statistics-config-link/list",
                ],
                [
                    "save",
                    "/api/system/contract-project-statistics-config-link",
                ],
            ]),
            modeEumnMap: new Map([
                ["实时计算模式", 1],
                ["入库倒推模式", 2],
            ]),
            scopeEumnMap: new Map([
                ["同步修改前的价格", 2],
                ["影响修改后的价格", 1],
            ]),
        };
    }

    loadMockData() {
        this.entityList.value = entityList;
    }

    load(mode, fn) {
        fetch(
            `${
                this.context.baseURL +
                this.context.apiMap.get("load")
            }?` +
                `statisticsMode=${this.context.modeEumnMap.get(
                    mode
                )}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "x-www-form-urlencoded",
                },
            }
        )
            .then(res => res.json())
            .then(result => fn(result.data))
            .then(
                entityList => {

                    (this.entityList.value = entityList)


                    console.log(this.entityList.value);
                }
            );
    }

    find(index) {
        return this.entityList.value[index];
    }

    save(entity, fn) {
        const _data = fn({
            entity,
            modeEumnMap: this.context.modeEumnMap,
            scopeEumnMap: this.context.scopeEumnMap,
        });

        fetch(
            `${
                this.context.baseURL +
                this.context.apiMap.get("save")
            }?`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(_data),
            }
        )
            .then(res => res.json())
            .then(result => {
                console.log(result);
            });
    }
}
