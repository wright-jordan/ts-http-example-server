import * as http from "node:http";
import * as tsHTTP from "../tsHTTP.js";
import { sendStringMiddleware, cookiesMiddleware, } from "../middleware/index.js";
export function Handler(_deps) {
    return async (_req, _res, ctx) => {
        ctx.reply = JSON.stringify({ hello: "world" });
    };
}
export function Listener() {
    const wrappedHandler = sendStringMiddleware.use(cookiesMiddleware.use(Handler(null)));
    return (req, res) => {
        const ctx = {
            reply: "",
            status: 200,
            cookies: [],
        };
        wrappedHandler(req, res, ctx);
    };
}
