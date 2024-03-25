const u = [1, 2];
const v = [3, 4];

const p = [...u, ...v];
const q = Object.assign(v, u);

console.log(q);
