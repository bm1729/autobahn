/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var routes = {};

var JunctionMixIn = function(_previousJunction) {
    this.previous = _previousJunction;
    this.previous.next = this;
};

var ToMixIn = function() {
    var that = this;
    that.to = function(destination) {
         var junction = {};
         JunctionMixIn.call(junction, that);
         
         return junction;
    };
};

var LogMixIn = function() {
    var junction = {};
    JunctionMixIn.call(junction);
    LogMixIn.call(junction);
    ToMixIn.call(junction);
    
    junction.invoke = function(message) {
        console.log(message);
        junction.next.invoke(message);
    };
    
    return junction;
};

function from(source) {
    var junction = {};
    JunctionMixIn.call(junction);
    LogMixIn.call(junction);
    ToMixIn.call(junction);
    
    routes[source] = junction;
    junction.invoke = function(message) { this.next.invoke(message); };
    
    return junction;
}

function send(route, message) {
    routes[route].invoke(message);
}

exports.awesome = {
    from: from,
    send: send
};
