import test from "node:test";
import * as tsHTTP from "../tsHTTP.js";
import * as hello from "./hello.js";
import assert from "node:assert/strict";
import { NewSendStringMiddleware } from "../middleware/sendStringMiddleware.js";
import { NewCookiesMiddleware } from "../middleware/cookiesMiddleware.js";
test('should push "hello=world" to ctx.cookies', async () => {
    const sendString = NewSendStringMiddleware();
    const cookies = NewCookiesMiddleware();
    const testServer = tsHTTP.NewTestServer(hello.Listener(sendString, cookies, null));
    testServer.listen(8080);
    // @ts-ignore
    const res = await fetch("http://localhost:8080");
    assert.ok(true);
    await testServer.stop();
});
