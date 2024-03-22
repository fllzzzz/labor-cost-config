/* 
合并
	obj->obj 	map<string, any>
	obj->arr	arr.foreach
	obj->base	map<string, any>

	arr->arr	arr.foreach 
	arr->base	arr.foreach => fn => map<string,any> => 
				map[].foreach => map.foreach
	base->base  map<string, any>	=> map.foreach => this[key] = value

	obj			map<string, any>
	
	arr			arr.foreach => map

	base		

	delete: bool
	反向遍历?

拆分
	obj		map<string, any>
	arr		arr.foreach		map<string, any>
	base	map

	delete: bool
*/

const T = {
	P1: 9,
	P2: {
		A: 'a',
		B: 'b',
	},
	P3: [
		{
			C: 'c',
			D: 'd',
		},
		{
			E: 'e',
			F: 'f',
		},
	],
	P6: [
		{
			C: 'c',
			D: 'd',
		},
		{
			E: 'e',
			F: 'f',
		},
		{
			E: 'e',
			F: 'f',
		},
	],
	P4: {
		g: 'g',
		h: 'h',
	},
	P5: 90,
};

((
	targetList,
	fn
) => {

})()