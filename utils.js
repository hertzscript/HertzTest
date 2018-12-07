'use strict';

const promtest = (f, ...args) => {
	try {
		return Promise.resolve(f(...args))
			.then(result => {
				for (const [ name, val ] of Object.entries(result)) {
					if (!val) {
						return Promise.reject(new Error('Test failed: ' + name));
					}
				}
				return result;
			});
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = {
	promtest
};
