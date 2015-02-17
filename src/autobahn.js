/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var Route = require('./route');
var SeriesRouteBuilder = require('./routeBuilder').SeriesRouteBuilder;

var routes = {};

function from(source) {
    var route = new Route();
    var routeBuilder = new SeriesRouteBuilder(route);
    routes[source] = route;
    
    return routeBuilder;
}

function send(route, message) {
    routes[route].invoke(message);
}

module.exports = {
    from: from,
    send: send
};
