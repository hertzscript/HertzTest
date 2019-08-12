'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const yargs = require('yargs');


const proc = require('./utils/proc');

const readdir = promisify(fs.readdir);

const hasCompiler = fs.existsSync(join(
	__dirname,
	'node_modules',
	'hertzscript-compiler',
	'package.json'));

const args = yargs
	.alias('v', 'version')
	.alias('h', 'help')
	.option('o', {
		alias: 'out',
		default: false,
		describe: 'Show output from tests',
		type: 'boolean'
	})
	.option('c', {
		alias: 'compiler-path',
		demandOption: !hasCompiler,
		default: hasCompiler
			? join('node_modules', 'hertzscript-compiler')
			: undefined,
		describe: 'path to hertzscript-compiler node module',
		type: 'string'
	})
	.argv;

const filter = args._;

const stdio = args.o
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
			proc('node', [
				join(
					__dirname,
					args.compilerPath,
					require(join(
							__dirname,
							args.compilerPath,
							'package.json')).bin.hzc),
				...hzArgs
			], dir, stdio)
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
					({ code, time }) =>
						console.log(`${dir}: ✅  (${time}ms)`),
					err =>
						console.error(`${err.message}: ❌`)))));
