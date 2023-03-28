import * as http from "node:http";
export function NewTestListener(deps, ctx, Handler) {
    const handler = Handler(deps);
    return (req, res) => {
        handler(req, res, ctx).then(() => {
            if (!res.headersSent) {
                res.end();
            }
        });
    };
}
export function NewListener(routes, fallback) {
    return async (req, res) => {
        (routes.get(req.url.split("?", 1)[0]) || fallback)(req, res);
    };
}
