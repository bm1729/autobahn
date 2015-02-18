# autobahn [![Build Status](https://secure.travis-ci.org/bm1729/autobahn.png?branch=master)](http://travis-ci.org/bm1729/autobahn)

Simple message routing

## Getting Started
Install the module with: `npm install autobahn`

## Documentation
_(Coming soon)_

## Examples
```javascript
var autobahn = require('autobahn');

// Build the route
autobahn.from('source')
    .then(function(payload, onComplete) { onComplete(payload.replace(/ /g, '')); })
    .then(function(payload, onComplete) { onComplete(payload.toUpperCase()); });

// Send stuff to the route
autobahn.send('source', 'h e l l o !', function(result) {
    // result = 'HELLO!'
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Ben Mumford  
Licensed under the MIT license.
