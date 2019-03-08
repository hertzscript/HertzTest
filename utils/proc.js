'use strict';

const { platform } = require('os');
const { spawn } = require('child_process');

const isWin = platform() === 'win32';


const proc = (cmd, args, cwd = '.', stdio = 'ignore') =>
	new Promise((resolve, reject) =>
		spawn(
			...isWin
				? [ 'cmd.exe', [ '/c', cmd, ...args ] ]
				: [ cmd, args ],
			{
				cwd,
				stdio
			})
			.once('exit', code =>
				code === 0
					? resolve(code)
					: reject(
						Object.assign(
							new Error(cwd),
							{ code }))));

module.exports = proc;
