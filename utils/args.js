'use strict';

const partition = (pred, list) =>
	list.reduce(([ t, f ], x) =>
		pred(x)
			? [ [ ...t, x ], f ]
			: [ t, [ ...f, x ] ],
	[ [], [] ]);

const isOption = x =>
	x.startsWith('--') || x.startsWith('-');

const parse = args => {
	const [ options, inputs ] = partition(isOption, args);
	return {
		_: inputs,
		...options.reduce((acc, opt) => ({
			...acc,
			[opt.replace(/^-+/, '')]: true
		}), {})
	};
};

module.exports = parse;
