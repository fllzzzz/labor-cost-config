import { Repository } from "./lc-porject.repository";

export class Aggregate {
	repo;
	entityList;

	/**
	 * 
	 * @param {Repository} Repository 
	 */
	constructor(Repository) {
		this.entityList = [];
        this.repo = new Repository();
    }
	/**
	 * @param {number} index
	 * @param {string} key
	 * @param {(ctx: any) => any} fn
	 */
	modify(index, key) {
		this.entityList[index][key] = fn(
			this.entityList[index][key]
		);
	}

	/**
	 * @param {number} index
	 */
	save(index) {
		this.repo.sav(index);
	}

	
}
