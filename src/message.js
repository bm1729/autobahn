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
        that.currentWaypoint.accept(that.payload, function(newPayload) {
            that.payload = newPayload;
            that.currentWaypoint = that.currentWaypoint.next;
            if (that.currentWaypoint) {
                that.visit();
            } else {
                if (_.isFunction(that.onFinished)) {
                    that.onFinished(that.payload);
                }
            }
        });
    };
}

module.exports = Message;