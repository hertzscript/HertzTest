'use strict';

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
		return;
	}
	yield from;
	return yield* range(from + step, to, step);
};

const actual = [ ...range(0, 3) ];
console.log(actual);
const expected = [ 0, 1, 2 ];

if (
	actual[0] !== expected[0] ||
	actual[1] !== expected[1] ||
	actual[2] !== expected[2] ||
	actual.length !== expected.length
) {
	throw new Error('Fail!');
}
console.log('Generators done!');
