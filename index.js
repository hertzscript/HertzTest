'use strict';

const { readdirSync } = require('fs');
const { promtest } = require('./utils');

Promise.all([
	promtest(require('./tests/isFQDN'), {})
])
	.then(function (results) {
		console.log(results);
	});
