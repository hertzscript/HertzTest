'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const proc = require('./utils/proc');
const parse = require('./utils/args');

const readdir = promisify(fs.readdir);

const { _: filter, ...opts } = parse(process.argv.slice(2));


const stdio = opts.out || opts.o
	? 'inherit'
	: 'ignore';

const tests = 'tests';

const hzArgs = [
	'-s',
	'--spawn',
	'-i', 'test.js',
	'-o', 'test.hz.js'
];

readdir(tests)
	.then(dirs =>
		filter.length > 0
			? dirs.filter(dir =>
				filter.includes(dir))
			: dirs)
	.then(dirs =>
		Promise.all(dirs.map(dir => join(tests, dir)).map(dir =>
			proc('hzc', hzArgs, dir, stdio)
				.catch(err => {
					throw new Error(
						`${err.message} (compile: ${err.code})`);
				})
				.then(() =>
					proc(
						'node',
						[ '--max-old-space-size=8', 'test.hz.js' ],
						dir,
						stdio)
						.catch(err => {
							throw new Error(
								`${err.message} (run: ${err.code})`);
						}))
				.then(
					() =>
						console.log(`${dir}: ✅`),
					err =>
						console.error(`${err.message}: ❌`)))));
