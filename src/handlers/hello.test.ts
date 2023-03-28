import test from "node:test";
import * as http from "node:http";
import * as tsHTTP from "../tsHTTP.js";
import * as hello from "./hello.js";
import assert from "node:assert/strict";
test('should push "hello=world" to ctx.cookies', async () => {
  const ctx: hello.Ctx = {
    reply: "",
    status: -1,
    cookies: [],
  };
  const server = http.createServer(
    tsHTTP.NewTestListener<hello.Ctx, hello.Deps>(null, ctx, hello.Handler)
  );
  server.listen(8080);
  // @ts-ignore: experimental-fetch
  const res = await fetch("http://localhost:8080");
  assert.ok(ctx.cookies.includes("hello=world"));
});
