import { Entity } from "./lc-project.entity.js";
import { entityList } from "./lc-project.data.mock.js";
export class Aggregate {
	entityList;

	/**
	 * @param {Entity[]} list
	 */
	constructor(list) {
		this.entityList = list;
	}

	test() {
		console.log(this.entityList);
	}
}


const aggregate = new Aggregate(entityList);
aggregate.test();