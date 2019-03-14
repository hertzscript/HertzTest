'use strict';

const assert = require('assert');

const sleep = ms => {
	const end = Date.now() + ms;
	while (Date.now() < end);
};

const unlock = f => {
	sleep(1000);
	f();
};

let wait = true;
spawn unlock(() => wait = false);

while (wait);
console.log('1 sec passed');
assert(wait === false);
