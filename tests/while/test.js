'use strict';

const assert = require('assert');

let n = 0;

setTimeout(() => assert(n === 10000), 0);

while (n < 10000) {
	n++;
}
