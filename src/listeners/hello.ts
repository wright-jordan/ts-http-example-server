import * as http from "node:http";
import * as tsHTTP from "../tsHTTP.js";
import * as middleware from "../middleware/index.js";
import * as sample from "../middleware/sample.js";

export type Dependencies = null;
export type Context = sample.Context;

export function NewHandler(_deps: Dependencies): tsHTTP.Handler<Context> {
  return async (_req, res, ctx) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: ctx.message }));
  };
}

const handler = middleware.sample.use(NewHandler(null));

export function New(): http.RequestListener {
  return (req, res) => {
    const ctx: Context = {
      message: "",
    };
    handler(req, res, ctx);
  };
}
