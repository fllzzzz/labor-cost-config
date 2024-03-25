import { shallowRef } from "vue";
import { entityList } from './lc-project.data.mock.js';

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
            baseURL: "",
            dateformat: "",
            modeList: [],
            scopeList: [],
            modifyScreenList: [],
            apiMap: new Map(),
            modeEumnMap: new Map(),
            scopeEumnMap: new Map(),
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
                entityList =>
                    (this.entityList.value = entityList)
            );
    }

    find(index) {
        return this.entityList.value.find(
            entity => entity.id === index
        );
    }

    save(entity, fn) {
        const _data = fn({
            entity,
            modeEumnMap: this.modeEumnMap,
            scopeEumnMap: this.scopeEumnMap,
        });

        debugger;

        fetch(
            `${
                this.context.baseURL +
                this.context.apiMap.get("load")
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
