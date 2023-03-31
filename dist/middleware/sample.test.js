import test from "node:test";
import * as sample from "./sample.js";
import * as tsHTTP from "../tsHTTP.js";
import supertest from "supertest";
import assert from "node:assert/strict";
test("should set ctx.message to the value of config.message", async () => {
    const tests = [
        {
            ctx: { message: "" },
            config: { message: "hello world" },
            expected: "hello world",
            actual: "",
        },
        {
            ctx: { message: "" },
            config: { message: "hola mundo" },
            expected: "hola mundo",
            actual: "",
        },
    ];
    const handler = async (_req, res, _ctx) => {
        res.end();
    };
    // EXERCISE
    for (const test of tests) {
        await supertest(tsHTTP.NewTestListenerFromMiddleware(test.ctx, sample.New(test.config), handler)).get("/");
        test.actual = test.ctx.message;
    }
    // VERIFY
    for (const test of tests) {
        assert.deepEqual(test.actual, test.expected);
    }
    // TEARDOWN
    ("n/a");
});
