@md dist
@copy node_modules\hertzscript\src\Dispatcher.js dist\Dispatcher.js
@copy node_modules\hertzscript\src\TokenLib.js dist\TokenLib.js
@copy node_modules\hertzscript\src\Kernelizer.js dist\Kernelizer.js
@node_modules\.bin\hzc -i src/index.js -o dist/index.hz.js --standalone %*