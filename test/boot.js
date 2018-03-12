'use strict';

/**
* Bootstrap an environment which looks like the ECMA262 test harness
*
* Author: Mike Ralphson
* License: MIT
*/

var util = require('util');
var assert = require('assert');
var overthrows = assert.throws;
//var regex = require('../regex.js');
var parser = require('../parser.js').parser;

class re {
    constructor(e) {
        this.exp = parser.compile(e);
    }
    match(s) {
        return this.exp.match(s);
    }
};

global.RegExp = re;
global.assert = assert;
assert.throws = function(e,f) {
    return overthrows(f,e);
};
assert.notSameValue = function(a,e,m){
    return assert.notStrictEqual(a,e,m);
};
assert.sameValue = function(a,e,m){
    return assert.strictEqual(a,e,m);
};

class Test262Error extends Error {};

global.SyntaxError = SyntaxError;
global.Test262Error = Test262Error;

global.errors = Object.assign({}, global.errors, {
    AssertionError: assert.AssertionError
});

global.$ERROR = function(s) {
    return s;
};
global.$262 = {
    createRealm: function() {
        return { global: global };
    }
};

// TODO

global.verifyNotEnumerable = function(o,p) {
    return true;
};
global.verifyWritable = function(o,p) {
    return true;
};
global.verifyNotConfigurable = function(o,p) {
    return true;
};

