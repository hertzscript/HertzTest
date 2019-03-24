'use strict';

const assert = require('assert');

const foo = async () => {
	const four = await Promise.resolve(4);
	return four;
};

const p = foo();

assert(p instanceof Promise, 'foo does not return a promise: ' + p);

p.then(four =>
	assert(four === 4, 'resolved value is not correct'));
