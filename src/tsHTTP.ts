import * as http from "node:http";

type JSON =
  | boolean
  | number
  | string
  | null
  | { [key: string]: JSON }
  | Array<JSON>;

interface Context {
  [key: string]: JSON;
}

export type Handler<C extends Context> = {
  (req: http.IncomingMessage, res: http.ServerResponse, ctx: C): Promise<void>;
};

export function NewTestListenerFromHandler<C extends Context>(
  ctx: C,
  handler: Handler<C>
): http.RequestListener {
  return function (req, res) {
    handler(req, res, ctx);
  };
}

export function NewTestListenerFromMiddleware<C extends Context>(
  ctx: C,
  middleware: Middleware<C>,
  handler: Handler<C>
): http.RequestListener {
  return async function (req, res) {
    middleware.use(handler)(req, res, ctx);
  };
}

export function App(
  routes: Map<string, http.RequestListener>,
  fallback: http.RequestListener
): http.RequestListener {
  return async (req, res) => {
    (routes.get(req.url!.split("?", 1)[0]!) || fallback)(req, res);
  };
}

export type Middleware<C extends Context> = {
  use(this: Middleware<C>, next: Handler<any>): Handler<C>;
};
