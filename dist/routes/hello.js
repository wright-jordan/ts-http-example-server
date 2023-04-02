import * as middleware from "../middleware/index.js";
export function NewWithContext(_deps) {
    return async (_req, res, ctx) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: ctx.message }));
    };
}
const ctxListener = middleware.sample.use(NewWithContext(null));
export function New() {
    return (req, res) => {
        const ctx = {
            message: "",
        };
        ctxListener(req, res, ctx);
    };
}
