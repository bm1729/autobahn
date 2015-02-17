/*
 * autobahn
 * https://github.com/bm1729/autobahn
 *
 * Copyright (c) 2015 Ben Mumford
 * Licensed under the MIT license.
 */

'use strict';

var uuid = require('node-uuid');

function Message(_body) {
    this.body = _body;
    this.uuid = uuid.v1();
}

module.exports = Message;