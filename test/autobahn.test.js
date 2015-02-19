/* globals describe, it */

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var target = require('../src/autobahn');
 
describe('autobahn', function () {
    it('should work with a single waypoint route', function (done) {
        
        target.from('source')
            .then(function(payload, onComplete) { onComplete(null, payload.toUpperCase()); });
            
        target.send('source', 'hello world!', function(error, result) {
            assert.isNull(error);
            expect(result).to.equal('HELLO WORLD!');
            done();
        });
    });
    
    it('should work with multiple waypoint route', function(done) {
        target.from('source')
            .then(function(payload, onComplete) { onComplete(null, payload.replace(/ /g, '')); })
            .then(function(payload, onComplete) { onComplete(null, payload.toUpperCase()); });
            
        target.send('source', 'h e l l o !', function(error, result) {
            assert.isNull(error);
            expect(result).to.equal('HELLO!');
            done();
        });
    });
    
    it('should work with a split route', function (done) {
        
        target.from('source')
            .split(function(payload) { return payload.split(','); })
                .then(function(payload, onComplete) {  onComplete(null, payload.toUpperCase()); })
            .merge(function(parts) { return parts.join(''); });
            
        target.send('source', 'a,b,c', function(error, result) {
            assert.isNull(error);
            expect(result).to.equal('ABC');
            done();
        });
    });
    
    it('should work with nested splits', function(done) {
        
        target.from('source')
            .split(function(payload) { return payload.split(','); })
                .then(function(payload, onComplete) {  onComplete(null, payload.replace(/b/g, '')); })
                .split(function(payload) { return payload.split(' '); })
                    .then(function(payload, onComplete) {  onComplete(null, payload.toUpperCase()); })
                .merge(function(parts) { return parts.join(''); })
            .merge(function(parts) { return parts.join(''); });
            
        target.send('source', 'ab ab,cb cb ', function(error, result) {
            assert.isNull(error);
            expect(result).to.equal('AACC');
            done();
        });
    });
    
    it('should report errors when they occur', function(done) {
        
        target.from('source')
            .then(function(payload, onComplete) { onComplete('error!', null); });
            
        target.send('source', 'hello world!', function(error, result) {
            assert.isNull(result);
            expect(error).to.equal('error!');
            done();
        });
    });
    
    it('should report errors from within split routes', function(done) {
        
        target.from('source')
            .split(function(payload) { return payload.split(','); })
                .then(function(payload, onComplete) { onComplete('error!', null); })
            .merge(function(parts) { return parts.join(''); });
            
        target.send('source', 'a,b,c', function(error, result) {
            assert.isNull(result);
            expect(error).to.equal('error!');
            done();
        });
    });
});