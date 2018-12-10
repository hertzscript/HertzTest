'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');
const { builtinModules: builtin } = require('module');

const oreq = require;

const log = x => (console.log(x), x);

const resolveInternal = path =>
	oreq.resolve(path, { paths: [
		'node_modules/hertzscript/src'
	] });

require = path => {
	console.log('[require]: ' + path);
	return builtin.includes(path) ? oreq(path) :
	(
		path === './TokenLib.js' ||
		path === './Dispatcher.js'
	) ? oreq(resolveInternal(path)) :
	oreq(path);
};

const Gen = eval([
	'(function* () {',
	readFileSync(join(__dirname, 'node_modules/hertzscript/src/testOutput.hz.js'), 'utf8'),
	'})'
].join('\n'));

const gen = Gen();

let cur = gen;

while (!cur.done) {
	const val = cur.value;
	cur.value
		? cur = gen.next(
			val.type === 'callArgs' ? val.functor(...val.args) :
			val.type === 'callMethodArgs' ? val.object[val.property](...val.args) :
			val.type === 'returnValue' ? val :
			log(val))
		: cur = gen.next();
};

// require('hertzscript/src/testOutput.hz');
