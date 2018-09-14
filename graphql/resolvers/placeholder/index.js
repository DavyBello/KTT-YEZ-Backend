const { PlaceHolderTC } = require('../../composers');

PlaceHolderTC.addResolver(require('./success'));
PlaceHolderTC.addResolver(require('./underDevelopment'));
