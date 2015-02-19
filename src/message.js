/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

function Message(_currentWaypoint, _payload, _onFinished) {
    
    var that = this;
    
    that.currentWaypoint = _currentWaypoint;
    that.payload = _payload;
    that.onFinished = _onFinished;
    
    that.visit = function() {
        that.currentWaypoint.accept(that.payload, function(error, newPayload) {
            
            // If the waypoint reports an error when processing the message then call onFinished prematurely
            if (error !== undefined && error !== null && _.isFunction(that.onFinished)) {
                that.onFinished(error, null);
                return;
            }
            
            // Update the payload
            that.payload = newPayload;
            
            // Visit the next waypoint if appropriate
            that.currentWaypoint = that.currentWaypoint.next;
            if (that.currentWaypoint) {
                that.visit();
            } else {
                // If there are no more waypoints to visit then call onFinished 
                if (_.isFunction(that.onFinished)) {
                    that.onFinished(null, that.payload);
                }
            }
        });
    };
}

module.exports = Message;