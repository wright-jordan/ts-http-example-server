import * as http from "node:http";
import * as tsHTTP from "ts-http";
import * as middleware from "../middleware/index.js";
import * as sample from "../middleware/sample.js";

export type Dependencies = null;
export type Context = sample.Context;

export function NewWithContext(
  _deps: Dependencies
): tsHTTP.ListenerWithContext<Context> {
  return async (_req, res, ctx) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: ctx.message }));
  };
}

const ctxListener = middleware.sample.use(NewWithContext(null));

export function New(): http.RequestListener {
  return (req, res) => {
    const ctx: Context = {
      message: "",
    };
    ctxListener(req, res, ctx);
  };
}
