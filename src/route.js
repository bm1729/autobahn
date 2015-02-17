/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var Message = require('./message');

function Route() {
    var that = this;
    
    var onTaskComplete = function(message) {
        if (that.tasks.length > 0) {
            var task = that.tasks.shift();
            task(message, onTaskComplete);     
        }
    };
    
    that.tasks = [];
    that.invoke = function(body) {
        var message = new Message(body);
        var task = that.tasks.shift();
        task(message, onTaskComplete);
    };
}

module.exports = Route;