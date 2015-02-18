/* globals describe, it */

var expect = require('chai').expect;
var target = require('../src/autobahn');
 
describe('autobahn', function () {
    it('should work with a simple route', function (done) {
        
        target.from('source')
            .then(function(payload, onComplete) {
                onComplete(payload.toUpperCase());
            });
            
        target.send('source', 'hello world!', function(payload) {
            expect(payload).to.equal('HELLO WORLD!');
            done();
        });
    });
    
    it('should work with a split route', function (done) {
        
        target.from('source')
            .split(function(payload) { return payload.split(','); })
                .then(function(payload, onComplete) {
                    onComplete(payload.toUpperCase());
                })
            .merge(function(parts) { return parts.join(''); });
            
        target.send('source', 'a,b,c', function(payload) {
            expect(payload).to.equal('ABC');
            done();
        });
    });
});