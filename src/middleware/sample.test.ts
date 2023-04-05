import test from "node:test";
import * as sample from "./sample.js";
import * as tsHTTP from "ts-http";
import supertest from "supertest";
import assert from "node:assert/strict";

test("should set ctx.message to the value of config.message", async () => {
  // SETUP
  type Test = {
    ctx: sample.Context;
    expected: string;
    actual: unknown;
    config: sample.Config;
  };
  const tests: Test[] = [
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
  const ctxListener: tsHTTP.ListenerWithContext<sample.Context> = async (
    _req,
    res,
    _ctx
  ) => {
    res.end();
  };

  // EXERCISE
  for (const test of tests) {
    await supertest(
      tsHTTP.NewTestMiddlewareListener(
        test.ctx,
        sample.New(test.config),
        ctxListener
      )
    ).get("/");
    test.actual = test.ctx.message;
  }

  // VERIFY
  for (const test of tests) {
    assert.deepEqual(test.actual, test.expected);
  }

  // TEARDOWN
  ("n/a");
});
