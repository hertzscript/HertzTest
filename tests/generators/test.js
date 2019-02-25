'use strict';

const assert = require('assert');

const range = function* (
	from,
	to,
	step = from > to ? -1 : 1
) {
	if (
		step < 0
			? from <= to
			: from >= to
	) {
		// Compile bug with nullary return value
		// return;
		return undefined;
	}
	yield from;
	yield* range(from + step, to, step);
};

assert.deepStrictEqual([ ...range(0, 3) ], [ 0, 1, 2 ]);
console.log('Generators done!');
