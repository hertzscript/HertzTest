'use strict';

const assert = require('assert');

const createIsFQDN = require('isfqdn');

const isFQDN = createIsFQDN([
	'COM',
	'NET',
	'ORG'
]);

module.exports = options => ({
	'google.com': isFQDN('google.com'),
	'wikipedia.org': isFQDN('wikipedia.org'),
	'trgwii.com': isFQDN('trgwii.com')
});
