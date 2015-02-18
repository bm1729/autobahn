/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

function Message(_currentTask, _payload, _onFinished) {
    
    var that = this;
    
    that.currentTask = _currentTask;
    that.payload = _payload;
    that.onFinished = _onFinished;
    
    that.visit = function() {
        that.currentTask.accept(that.payload, function(newPayload) {
            that.payload = newPayload;
            that.currentTask = that.currentTask.next;
            if (that.currentTask) {
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