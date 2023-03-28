import * as http from "node:http";
import * as tsHTTP from "../tsHTTP.js";
import type { Context as SendStringCtx } from "../middleware/sendStringMiddleware.js";
import type { Context as CookiesCtx } from "../middleware/cookiesMiddleware.js";
import {
  sendStringMiddleware,
  cookiesMiddleware,
} from "../middleware/index.js";

export type Deps = null;
export type Ctx = SendStringCtx & CookiesCtx;

export function Handler(_deps: Deps): tsHTTP.Handler<Ctx> {
  return async (_req, _res, ctx) => {
    ctx.reply = JSON.stringify({ hello: "world" });
  };
}

export function Listener(): http.RequestListener {
  const wrappedHandler = sendStringMiddleware.use(
    cookiesMiddleware.use(Handler(null))
  );
  return (req, res) => {
    const ctx: Ctx = {
      reply: "",
      status: 200,
      cookies: [],
    };
    wrappedHandler(req, res, ctx);
  };
}
