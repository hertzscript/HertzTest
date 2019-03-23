'use strict';

const assert = require('assert');
const { promisify } = require('util');

const wait = promisify(setTimeout);


async function* foo() {
	yield 1;
	await wait(100);
	yield 2;
	await wait(100);
	yield 3;
	await wait(100);
	yield 4;
	await wait(100);
	return 5;
}

(async () => {

	let i = 0;
	for await (const x of foo()) {
		i++;
		assert(i === x);
	}
})();
