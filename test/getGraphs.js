"use strict";

let chai = require('chai');
chai.should();

describe("Hello",function(){
    describe("World",function(){
        it("hello should greet the world", function(){
            let hello = "world";
            hello.should.equal("world");
        })
    })
})