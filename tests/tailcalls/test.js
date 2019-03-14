'use strict';

const assert = require('assert');

const foo = n => {
	// arrow expression returns broken
	return n < 1000000 ? foo(n + 1) : n;
};

assert.deepStrictEqual(foo(1), 1000000);
