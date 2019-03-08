'use strict';

const fs = require('fs');
const { join } = require('path');
const { platform } = require('os');
const { promisify } = require('util');
const { spawn } = require('child_process');

const readdir = promisify(fs.readdir);

const isWin = platform() === 'win32';

const testDir = 'tests';

const argv = process.argv.slice(2);

const filter = argv
	.filter(x =>
		!(x.startsWith('--') || x.startsWith('-')));

const args = [
	'-s',
	'--spawn',
	'-i', 'test.js',
	'-o', 'test.hz.js'
];

const proc = (dir, args) =>
	new Promise((resolve, reject) =>
		spawn(
			...args,
			{
				cwd: dir,
				stdio: (argv.includes('--out') || argv.includes('-o'))
					? 'inherit'
					: 'ignore'
			})
			.once('exit', code =>
				code === 0
					? resolve(dir)
					: reject({ dir, code })));

readdir(testDir)
	.then(dirs =>
		filter.length > 0
			? dirs.filter(dir =>
				filter.includes(dir))
			: dirs)
	.then(dirs =>
		Promise.all(dirs.map(dir =>
			proc(
				join(testDir, dir),
				isWin
					? [ 'cmd.exe', [ '/c', ' hzc', ...args ] ]
					: [ 'hzc', args ]))))
	.catch(({ dir, code }) => {
		console.error(dir + ' (compile): ❌  (' + code + ')');
		process.exit(1);
	})
	.then(results =>
		Promise.all(results.map(dir =>
			proc(
				dir,
				[ 'node', [ '--max-old-space-size=4', 'test.hz.js' ] ]))))
	.catch(({ dir, code }) => {
		console.error(dir + ' (run): ❌  (' + code + ')');
		process.exit(1);
	})
	.then(res =>
		res.map(test =>
			console.log(test + ': ✅')));
