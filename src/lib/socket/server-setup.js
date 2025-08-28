// Setup module alias for runtime path resolution in CommonJS
const moduleAlias = require('module-alias');
const path = require('path');

// Register path aliases
moduleAlias.addAliases({
  '@': path.resolve(__dirname, '../../'),
});

// Export the socket server after aliases are set up
module.exports = require('./server');
