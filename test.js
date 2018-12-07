'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');
eval([
	'(function* () {',
	readFileSync(join(__dirname, 'node_modules/hertzscript/src/testOutput.hz.js'), 'utf8'),
	'})'
].join('\n'))();


// require('hertzscript/src/testOutput.hz');
