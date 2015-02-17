/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var winston = require('winston');
var Route = require('./route');

function then(task) {
    this.route.tasks.push(task);
    return this;  
}

function log() {
    return then(function(message, onComplete) {
        winston.info(message);
        onComplete(message);
    });
}

function split(splitter) {
    return new ParallelRouteBuilder(new Route(), splitter, this);
}

function merge(merger) {
    
    var that = this;
    
    that.then(function(message, onComplete) {
        // I've got the result from this message part here. What to do with it?
    });
    
    return that.parentBuilder.then(function(message, onComplete) {
        
        // Split the message into component parts according to the splitter
        var parts = that.splitter(message);
        
        // Pass each new message into a new route defined by a ParallelRouteBuilder
        for (var part in parts) {
            that.route.invoke(part);
        }
        
        // Gather together the route results somehow?
        
        // Merge them
        
        // Call the on complete method
        var mergedMessage = null;
        onComplete(mergedMessage);
    });
}

function SeriesRouteBuilder(_route) {
    this.route = _route;
}
SeriesRouteBuilder.prototype.then = then;
SeriesRouteBuilder.prototype.log = log;
SeriesRouteBuilder.prototype.split = split;

function ParallelRouteBuilder(_route, _splitter, _parentBuilder) {
    this.route = _route;
    this.splitter = _splitter;
    this.parentBuilder = _parentBuilder;
}
ParallelRouteBuilder.prototype.then = then;
ParallelRouteBuilder.prototype.log = log;
ParallelRouteBuilder.prototype.split = split;
ParallelRouteBuilder.prototype.merge = merge;

module.exports = {
    SeriesRouteBuilder: SeriesRouteBuilder
};