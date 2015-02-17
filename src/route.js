/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

function Route() {
    var that = this;
    
    var onComplete = function(message) {
        if (that.tasks.length > 0) {
            var task = that.tasks.shift();
            task(message, onComplete);     
        }
    };
    
    that.tasks = [];
    that.invoke = function(message) {
        var task = that.tasks.shift();
        task(message, onComplete);
    };
}

module.exports = Route;