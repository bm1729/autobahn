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

function SeriesRouteBuilder(_route) {
    this.route = _route;
}
SeriesRouteBuilder.prototype.then = then;
SeriesRouteBuilder.prototype.log = log;

// function ParallelRouteBuilder(_parentBuilder, _onMerged) {
//     this.parentBuilder = _parentBuilder;
//     this.onMerged = _onMerged;
// }
// ParallelRouteBuilder.prototype.then = then;
// ParallelRouteBuilder.prototype.log = log;

module.exports = {
    SeriesRouteBuilder: SeriesRouteBuilder
};