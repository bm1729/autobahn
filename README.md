# autobahn [![Build Status](https://secure.travis-ci.org/bm1729/autobahn.png?branch=master)](http://travis-ci.org/bm1729/autobahn)

Simple message routing

## Getting Started
Install the module with: `npm install autobahn`

## Documentation
* [`from`](#from)
* [`then`](#then)
* [`log`](#log)
* [`split`](#split)
* [`merge`](#merge)
* [`send`](#send)

<a name="forFrom" />
<a name="from" />
### from(source)

Creates a new route for the autobhan.

__Arguments__

* `source` - The name of the route

<a name="forThen" />
<a name="then" />
### then(task)

Creates a new waypoint on the route.

__Arguments__

* `task` - A function which takes two variables: payload representing the incoming message payload, and onComplete which is a callback to be invoked with the new payload.

<a name="forLog" />
<a name="log" />
### log()

Logs the the message payload. This is done using winston at the info level.

<a name="forSplit" />
<a name="split" />
### split(splitter)

Splits the message into multiple parts for processing in parallel. A split must have a corresponding merge.

__Arguments__

* `splitter` - A function which takes a message payload, splits it and returns an array of new payloads.

<a name="forMerge" />
<a name="merge" />
### merge(merger)

Merges a split message back into a single message.

__Arguments__

* `merger` - A function which takes an array of payloads, merges them and returns a single payload.

<a name="forSend" />
<a name="send" />
### send(route, payload, finished)

Send a payload along a route.

__Arguments__

* `route` - The name of the route.
* `payload` - The payload to send.
* `finished` - An optional callback invoked when the route is completed.

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
