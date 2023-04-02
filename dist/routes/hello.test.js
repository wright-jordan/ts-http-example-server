import test from "node:test";
import * as tsHTTP from "../tsHTTP.js";
import * as hello from "./hello.js";
import assert from "node:assert/strict";
import supertest from "supertest";
test("should respond with `{ message: ctx.message }`", async () => {
    const tests = [
        {
            ctx: { message: "hello world" },
            expected: { message: "hello world" },
            actual: null,
            deps: null,
        },
        {
            ctx: { message: "hola mundo" },
            expected: { message: "hola mundo" },
            actual: null,
            deps: null,
        },
    ];
    // EXERCISE
    for (const test of tests) {
        const res = await supertest(tsHTTP.NewTestRouteListener(test.ctx, hello.NewWithContext(test.deps))).get("/");
        test.actual = res.body;
    }
    // VERIFY
    for (const test of tests) {
        assert.deepEqual(test.actual, test.expected);
    }
    // TEARDOWN
    ("n/a");
});
