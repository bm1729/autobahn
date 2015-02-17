/* globals describe, it */

var expect = require('chai').expect;
var target = require('../src/autobahn');
 
describe('autobahn', function () {
    it('should work with a simple route', function (done) {
        target.from('source')
            .then(function(message, onComplete) { onComplete(message.toUpperCase()); })
            .then(function(message, onComplete) {
                expect(message).to.equal('HELLO WORLD!');
                done();
            });
            
        target.send('source', 'hello world!');
    });
});