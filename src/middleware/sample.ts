import * as tsHTTP from "../tsHTTP.js";

export type Context = {
  message: string;
};

type Config = {
  message: string;
};

export type Middleware = tsHTTP.Middleware<Context> & {
  config: Config;
};

function use(
  this: Middleware,
  next: tsHTTP.Handler<any>
): tsHTTP.Handler<Context> {
  return async (req, res, ctx) => {
    ctx.message = this.config.message;
    await next(req, res, ctx);
  };
}

export function New(config: Config): Middleware {
  return {
    config,
    use,
  };
}
