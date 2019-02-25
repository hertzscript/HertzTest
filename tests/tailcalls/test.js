'use strict';

const foo = n =>
	n < 1000000 ? foo(n + 1) : n;

foo(1);
