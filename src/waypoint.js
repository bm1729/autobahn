/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

function Waypoint(_previous, task) {
    
    var that = this;
    
    if (_previous) {
        _previous.next = that;
    }
    
    that.accept = function(messageBody, onComplete) {
        task(messageBody, onComplete);
    };
}

module.exports = Waypoint;