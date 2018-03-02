require('babel-register');
require('babel-polyfill');
const lessParser = require('postcss-less').parse;
require('css-modules-require-hook')({
    generateScopedName: '[name]-[local]-[hash:base64:5]',
    camelCase: true,
    rootDir: './client/',
    extensions: '.less',
    processorOpts: {parser: lessParser}
});
require('./app.js');
