'use strict';

const { readdirSync } = require('fs');
const { promtest } = require('./utils');

module.exports = () =>
	Promise.all([
		promtest(require('./tests/isFQDN'), {})
	])
		.then(results =>
			console.log(results));
