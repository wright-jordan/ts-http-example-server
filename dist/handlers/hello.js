import * as http from "node:http";
import * as tsHTTP from "../tsHTTP.js";
export function Handler(_deps) {
    return async (_req, _res, ctx) => {
        ctx.reply = JSON.stringify({ hello: "world" });
    };
}
export function Listener(sendString, cookies, deps) {
    const wrappedHandler = sendString.use(cookies.use(Handler(deps)));
    return (req, res) => {
        const ctx = {
            reply: "",
            status: 200,
            cookies: [],
        };
        wrappedHandler(req, res, ctx);
    };
}
