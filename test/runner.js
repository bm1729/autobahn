var Mocha = require('mocha');

var mocha = new Mocha();

var passed = [];
var failed = [];

mocha.addFile('autobahn.test');

mocha.timeout(0);

mocha.run(function(){

    console.log(passed.length + ' Tests Passed');
    passed.forEach(function(testName){
        console.log('Passed:', testName);
    });

    console.log("\n"+failed.length + ' Tests Failed');
    failed.forEach(function(testName){
        console.log('Failed:', testName);
    });

}).on('fail', function(test){
    failed.push(test.title);
}).on('pass', function(test){
    passed.push(test.title);
});

var a = 2;