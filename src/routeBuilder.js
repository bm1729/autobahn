/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var winston = require('winston');
var Waypoint = require('./waypoint');
var Message = require('./message');

function then(task) {
    this.tail = new Waypoint(this.tail, task);
    return this;
}
    
function log() {
    return this.then(function(payload, onComplete) {
        winston.info(payload);
        onComplete(null, payload);
    });
}

function split(splitter) {
    var head = new Waypoint(null, function(payload, onCompleted) { onCompleted(null, payload); });
    return new ParallelRouteBuilder(head, splitter, this);  
}

function merge(merger) {

    var that = this;
    
    return that.parentBuilder.then(function(payload, onComplete) {
        
        // Split the payload into component parts according to the splitter
        var parts = that.splitter(payload);
        
        // The results
        var results = [];
        var errorReceived = false;
        var onSubTaskFinished = function(error, result) {
            
            // If there is an error message then jump out early and report the error to the parent route
            if (error !== undefined && error !== null) {
                
                // Only notify the parent once that an error has been received
                if (!errorReceived) {
                    errorReceived = true;
                    onComplete(error, null);
                }
                
                return;
            }
            
            // Record the result 
            results.push(result);
            
            // If all the sub tasks have finished that continue on with the parent route passing on the result of the merge
            if (results.length === parts.length) {
                onComplete(null, merger(results));
            }
        };
        
        // Pass each new message into a new route defined by a ParallelRouteBuilder
        for (var index in parts) {
            var childMessage = new Message(that.head, parts[index], onSubTaskFinished);
            childMessage.visit();
        }
    });
}

function SeriesRouteBuilder(_head) {
    this.tail = _head;
}
SeriesRouteBuilder.prototype.then = then;
SeriesRouteBuilder.prototype.log = log;
SeriesRouteBuilder.prototype.split = split;

function ParallelRouteBuilder(_head, _splitter, _parentBuilder) {
    this.head = _head;
    this.tail = _head;
    this.splitter = _splitter;
    this.parentBuilder = _parentBuilder;
}
ParallelRouteBuilder.prototype.then = then;
ParallelRouteBuilder.prototype.log = log;
ParallelRouteBuilder.prototype.split = split;
ParallelRouteBuilder.prototype.merge = merge;

module.exports = SeriesRouteBuilder;
