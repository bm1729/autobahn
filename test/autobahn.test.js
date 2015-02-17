/* globals describe, it */

var expect = require('chai').expect;
var target = require('../src/autobahn');
 
describe('autobahn', function () {
    it('should work with a simple route', function (done) {
        target.from('source')
            .then(function(message, onComplete) {
                onComplete(message.toUpperCase()); 
                
            })
            .then(function(message, onComplete) {
                expect(message).to.equal('HELLO WORLD!');
                done();
            });
            
        target.send('source', 'hello world!');
    });
    
    // it('should work with a split route', function (done) {
        
    //     var count = 0;
        
    //     target.from('source')
    //         .split(function(message) { return message.split(','); })
    //             .then(function(message, onComplete) {
    //                 ++count;
    //                 if (count === 3) {
    //                     done();
    //                 }
    //             })
    //         .merge(function(parts) {});
            
    //     target.send('source', 'a,b,c');
    // });
});