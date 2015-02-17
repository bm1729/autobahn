/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var winston = require('winston');

function RouteBuilder(route) {
    var that = this;
    that.then = function(task) {
        route.tasks.push(task);
        return that;  
    };
    that.log = function() {
        return that.then(function(message, onComplete) {
            winston.info(message);
            onComplete(message);
        });
    };
}

module.exports = RouteBuilder;