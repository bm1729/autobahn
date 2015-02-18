/* globals describe, it */

var expect = require('chai').expect;
var target = require('../src/autobahn');
 
describe('autobahn', function () {
    it('should work with a single waypoint route', function (done) {
        
        target.from('source')
            .then(function(payload, onComplete) { onComplete(payload.toUpperCase()); });
            
        target.send('source', 'hello world!', function(result) {
            expect(result).to.equal('HELLO WORLD!');
            done();
        });
    });
    
    it('should work with multiple waypoint route', function(done) {
        target.from('source')
            .then(function(payload, onComplete) { onComplete(payload.replace(/ /g, '')); })
            .then(function(payload, onComplete) { onComplete(payload.toUpperCase()); });
            
        target.send('source', 'h e l l o !', function(result) {
            expect(result).to.equal('HELLO!');
            done();
        });
    });
    
    it('should work with a split route', function (done) {
        
        target.from('source')
            .split(function(payload) { return payload.split(','); })
                .then(function(payload, onComplete) {  onComplete(payload.toUpperCase()); })
            .merge(function(parts) { return parts.join(''); });
            
        target.send('source', 'a,b,c', function(result) {
            expect(result).to.equal('ABC');
            done();
        });
    });
    
    it('should work with nested splits', function(done) {
        
        target.from('source')
            .split(function(payload) { return payload.split(','); })
                .then(function(payload, onComplete) {  onComplete(payload.replace(/b/g, '')); })
                .split(function(payload) { return payload.split(' '); })
                    .then(function(payload, onComplete) {  onComplete(payload.toUpperCase()); })
                .merge(function(parts) { return parts.join(''); })
            .merge(function(parts) { return parts.join(''); });
            
        target.send('source', 'ab ab,cb cb ', function(result) {
            expect(result).to.equal('AACC');
            done();
        });
        
    });
});