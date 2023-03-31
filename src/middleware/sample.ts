import * as tsHTTP from "../tsHTTP.js";

export type Context = {
  message: string;
};

export type Middleware = tsHTTP.Middleware<Context> & {
  config: Config;
};

interface Config {
  message: string;
}

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
