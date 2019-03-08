'use strict';

const assert = require('assert');

function foo() {
	console.log('Hello World!');
	return 4;
}

assert.deepStrictEqual(foo(), 4);
