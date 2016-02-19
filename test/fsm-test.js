"use strict";
const assert = require("assert");

const config = require("./config");
const fsm = require("../lib/fsm");

describe("fsmTest", function () {

    it("it does not create object of fsm", function () {
        const myBook = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        assert.throws(() => fsm(config, myBook, "simple1"), ReferenceError, "fsm(config, myBook, \"simple1\")");
    });

    it("it creates object of fsm", function () {
        const myBook = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        assert.doesNotThrow(() => fsm(config, myBook, "simple"), ReferenceError, "fsm(config, myBook, \"simple\")");
    });

    it("It creates identical objects for two finite machines", function () {
        const myBook = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        let myMachine = fsm(config, myBook, "simple");
        let myMachine1 = fsm(config, myBook1, "simple");

        assert.deepStrictEqual(myMachine, myMachine1, "myMachine1 === myMachine");
    });

    it("It can not re-aply same state", function () {
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        let myMachine1 = fsm(config, myBook1, "simple");
        myMachine1.apply("send_request");
        assert.throws(() => myMachine1.apply("send_request"), "  myMachine1.apply(\"send_request\")");
    });

    it("It can check if the state can be applied.", function () {
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        let myMachine1 = fsm(config, myBook1, "simple");

        assert.ok(() => myMachine1.can("send_request"), "  myMachine1.can(\"send_request\")");
    });


    it("It can chnage state of two finite machines independently", function () {
        const myBook = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };
        let myMachine = fsm(config, myBook, "simple");
        let myMachine1 = fsm(config, myBook1, "simple");

        myMachine1.apply("send_request");
        assert.notEqual(myMachine1.can("send_request"), myMachine.can("send_request"),
            "myMachine1.can(\"send_request\") != myMachine.can(\"send_request\")");
    });


    it("It does not change the object for which it is maintaing state.", function () {
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };

        const myBook = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };

        let myMachine1 = fsm(config, myBook1, "simple");
        myMachine1.apply("send_request");

        assert.deepStrictEqual(myBook1, myBook, " myBook1 === myBook");
    });

    it("It returns correct object\"s current state.", function () {
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };

        let myMachine1 = fsm(config, myBook1, "simple");
        myMachine1.apply("send_request");
        const currentState = myMachine1.getCurrentState();
        assert.equal(currentState, "requested", "  myMachine1.getCurrentState()");
    });

    it("It returns correct next possible transitions for object", function () {
        const myBook1 = {
            name: "My dummy book Object",
            author: "Dummy Author",
            pblisher: "Dummy Publisher"
        };

        let myMachine1 = fsm(config, myBook1, "simple");
        myMachine1.apply("send_request");
        myMachine1.apply("approve_request");
        const nextPossibleTransitionsExpected = ["return_book", "lost_book"];
        const nextPossibleTransitions = myMachine1.getNextPossibleTransitions();

        assert.deepEqual(nextPossibleTransitions, nextPossibleTransitionsExpected,
            " myMachine1.getNextPossibleTransitions()");

    });
});