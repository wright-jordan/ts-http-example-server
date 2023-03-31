import * as http from "node:http";
export function NewTestListenerFromHandler(ctx, handler) {
    return (req, res) => {
        handler(req, res, ctx);
    };
}
export function NewTestListenerFromMiddleware(ctx, middleware, handler) {
    return (req, res) => {
        middleware.use(handler)(req, res, ctx);
    };
}
export function NewAppListener(routes, fallback) {
    return async (req, res) => {
        (routes.get(req.url.split("?", 1)[0]) || fallback)(req, res);
    };
}
