/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var Waypoint = require('./waypoint');
var Message = require('./message');
var SeriesRouteBuilder = require('./routeBuilder');

var routes = {};

function from(source) {
    var head = new Waypoint(null, function(payload, onCompleted) { onCompleted(null, payload); });
    routes[source] = head;
    return new SeriesRouteBuilder(head);
}

function send(route, payload, finished) {
    var message = new Message(routes[route], payload, finished);
    message.visit();
}

module.exports = {
    from: from,
    send: send
};
