/* globals describe, it */

var expect = require('chai').expect;
var target = require('../src/autobahn');
 
describe('autobahn', function () {
    it('should work with a simple route', function (done) {
        target.from('source')
            .then(function(message, onComplete) { 
                message.body = message.body.toUpperCase();
                onComplete(message); 
                
            })
            .then(function(message, onComplete) {
                expect(message.body).to.equal('HELLO WORLD!');
                done();
            });
            
        target.send('source', 'hello world!');
    });
    
    // it('should work with a split route', function (done) {
        
    //     var count = 0;
        
    //     target.from('source')
    //         .split(function(message, onComplete) { return message.split(','); })
    //             .then(function(message, onComplete) {
    //                 ++count;
    //                 if (count === 3) {
    //                     done();
    //                 }
    //             });
            
    //     target.send('source', 'a,b,c');
    // });
});